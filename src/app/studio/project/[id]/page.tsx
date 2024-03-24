"use client";

import { type Contact, type User } from "@prisma/client";
import {
  CalendarIcon,
  CirclePlusIcon,
  ClipboardListIcon,
  EyeIcon,
  EyeOffIcon,
  FileStackIcon,
  ImagesIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { LoadingPage } from "~/components/global/loading";
import ServerError from "~/components/global/server-error";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";
import {
  type MessageWithData,
  type ProjectWithData,
  type TaskWithData,
} from "~/types";
import { DashboardCard } from "../../_components/dashboard-card";
import { TaskMenuItem } from "../../_components/dashboard-menu-items";
import { ProjectsSheet } from "../_components/projects-sheet";

function ProjectPageHeader(props: {
  project: ProjectWithData;
  participants: (User | Contact)[];
}) {
  const { project, participants } = props;
  return (
    <header className="space-y-5">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold leading-none md:text-3xl xl:text-5xl">
              {project.name}
            </CardTitle>
            <ProjectsSheet />
          </div>
        </CardHeader>

        {project.event && (
          <CardContent>
            <h2>
              {project.event.date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </h2>
            <h3 className="text-sm text-muted-foreground">
              {project.event.location}
            </h3>
          </CardContent>
        )}
      </Card>

      <section className="flex justify-between">
        <aside className="flex flex-col space-y-2">
          <p className="hidden text-xs text-muted-foreground md:inline-block">
            Visible to you + {participants.length - 1} participant
            {participants.length - 1 === 1 ? "" : "s"}
          </p>
          <div className="flex space-x-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex max-w-36 items-center space-x-2"
              >
                <Avatar>
                  <AvatarImage
                    src={participant.avatar ?? ""}
                    alt={`${participant.firstName} ${participant.lastName}`}
                  />
                  <AvatarFallback>
                    {participant.firstName[0]}
                    {participant.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="hidden text-xs sm:inline-block">
                  {participant.firstName} {participant.lastName}
                </p>
              </div>
            ))}
            <div className="flex cursor-pointer items-center space-x-2 transition-all ease-in-out hover:scale-95">
              <CirclePlusIcon size={28} className="text-muted-foreground" />
              <p className="text-xs">Add</p>
            </div>
          </div>
        </aside>

        <aside className="flex items-center space-x-3">
          <Button variant="ghost" className="flex space-x-2">
            <CalendarIcon size={16} />
            <span className="hidden sm:inline-block">Schedule</span>
          </Button>
          <Button className="flex space-x-2">
            <ImagesIcon size={16} />
            <span>Collection</span>
          </Button>
        </aside>
      </section>
    </header>
  );
}

function MessageCard(props: { message: MessageWithData }) {
  const { message } = props;
  return (
    <Card key={message.id} className="rounded-sm">
      <CardHeader className="flex-row items-center justify-between gap-2">
        <Avatar>
          <AvatarImage
            src={message.contact?.avatar ?? message.user?.avatar ?? ""}
            alt={message.contact?.firstName ?? message.user?.firstName}
          />
          <AvatarFallback>
            {message.contact?.firstName[0] ?? message.user?.firstName[0]}
            {message.contact?.lastName[0] ?? message.user?.lastName[0]}
          </AvatarFallback>
        </Avatar>

        <div className="mr-auto flex flex-col">
          <p className="text-sm font-semibold">
            {message.contact?.firstName ?? message.user?.firstName}{" "}
            {message.contact?.lastName ?? message.user?.lastName}
          </p>
          <p className="text-sm font-light">{message.subject}</p>
        </div>

        <time className="text-sm text-muted-foreground">
          {message.createdAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </time>
      </CardHeader>

      <Separator />

      <CardContent className="pt-5">
        <div
          className="font-light"
          dangerouslySetInnerHTML={{ __html: message.body }}
        />
      </CardContent>

      <CardFooter>
        {message.read && (
          <Badge className="my-auto ml-auto space-x-1">
            <EyeIcon size={16} />
            <p>Read</p>
          </Badge>
        )}
        {!message.read && (
          <Badge className="my-auto ml-auto space-x-1">
            <EyeOffIcon size={16} />
            <p>Unread</p>
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}

function StageSelector(props: { project: ProjectWithData }) {
  const { project } = props;
  return (
    <Card className="rounded-sm">
      <CardContent className="flex flex-row items-center gap-3 p-3">
        <FileStackIcon size={36} />
        <Label htmlFor="stage" className="text-md">
          Stage
        </Label>
        <Select defaultValue={project.stage}>
          <SelectTrigger id="stage">
            <SelectValue placeholder="Select a stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LEAD">Lead</SelectItem>
            <SelectItem value="PROSPECT">Prospect</SelectItem>
            <SelectItem value="CLIENT">Client</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="ONGOING">Ongoing</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

function TasksCard(props: { tasks: TaskWithData[] }) {
  const { tasks } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="rounded-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <CardHeader className="flex-row items-center justify-between gap-3 p-3 text-primary">
          <ClipboardListIcon size={24} />
          <CardTitle className="text-md mr-auto font-semibold">{`Tasks (${tasks.length})`}</CardTitle>
          <CollapsibleTrigger
            asChild
            className="cursor-pointer rounded transition-all ease-in-out hover:scale-95"
          >
            {isOpen ? <MinusIcon size={24} /> : <PlusIcon size={24} />}
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent className="space-y-2">
          <DashboardCard className="border-none">
            {tasks.map((task) => (
              <TaskMenuItem key={task.id} task={task} />
            ))}
          </DashboardCard>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function NotesCard(props: { notes: string }) {
  const { notes } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="rounded-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <CardHeader className="flex-row items-center gap-3 p-3 text-primary">
          <ClipboardListIcon size={24} />
          <CardTitle className="text-md mr-auto font-semibold">Notes</CardTitle>
          <CollapsibleTrigger
            asChild
            className="cursor-pointer rounded transition-all ease-in-out hover:scale-95"
          >
            {isOpen ? <MinusIcon size={24} /> : <PlusIcon size={24} />}
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent className="space-y-2">
          <CardContent>
            <p>{notes}</p>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const {
    data: project,
    isLoading,
    error,
  } = api.projects.getById.useQuery({ id: id?.toString() ?? "" });

  const agency = project?.agency;

  if (isLoading) return <LoadingPage />;
  if (error ?? !project ?? !agency)
    return (
      <ServerError
        code={404}
        message="The project you are looking for does not exist."
      />
    );

  // Preparing participants including both users and contacts
  const participants = [...project.contacts, ...agency.users];
  const messages = project.messages;
  const tasks = project.tasks.filter(
    (task) => !task.completed,
  ) as TaskWithData[];

  return (
    <article className="space-y-5">
      <ProjectPageHeader project={project} participants={participants} />

      {/* Displays reversed in mobile mode with flex,
          displays in columns as screen size increases */}
      <main className="content flex flex-col-reverse md:grid md:grid-cols-2 md:space-x-10 lg:grid-cols-5">
        <section className="space-y-5 md:col-span-1 lg:col-span-3">
          <Input placeholder="Type a message..." />
          <h3 className="text-sm font-light text-muted-foreground">
            Recent Activity
          </h3>
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message as MessageWithData}
            />
          ))}
        </section>

        <Card className="project-details mb-auto rounded-sm bg-transparent md:col-span-1 lg:col-span-2">
          <CardHeader className="flex-row items-center gap-3">
            <Avatar>
              <AvatarImage src={agency?.avatar ?? ""} alt="Agency Logo" />
              <AvatarFallback>{agency?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <LockIcon size={16} />
                <CardTitle className="font-semibold">
                  Only visible to you
                </CardTitle>
              </div>
              <p className="text-xs text-muted-foreground">
                Private place for you and your team to manage this project.
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 px-3">
            <StageSelector project={project} />
            <TasksCard tasks={tasks} />
            <NotesCard notes={project.notes} />
          </CardContent>
        </Card>
      </main>
    </article>
  );
}
