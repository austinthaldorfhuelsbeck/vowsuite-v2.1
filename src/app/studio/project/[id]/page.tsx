"use client";

import { LockIcon } from "lucide-react";

import { useParams } from "next/navigation";
import { LoadingPage } from "~/components/global/loading";
import ServerError from "~/components/global/server-error";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { type MessageWithData, type TaskWithData } from "~/types";

import MessageCard from "../_components/message-card";
import NotesCard from "../_components/notes-card";
import ProjectPageHeader from "../_components/project-page-header";
import StageSelector from "../_components/stage-selector";
import TasksCard from "../_components/tasks-card";

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
    (task) => task.projectId === project.id && !task.completed,
  ) as TaskWithData[];

  return (
    <article className="space-y-5">
      <ProjectPageHeader project={project} participants={participants} />

      {/* Displays reversed in mobile mode with flex,
          displays in columns as screen size increases */}
      <main className="content flex flex-col-reverse md:grid md:grid-cols-2 md:space-x-10 lg:grid-cols-5">
        {/* Messages */}
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

        {/* Project Details */}
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
