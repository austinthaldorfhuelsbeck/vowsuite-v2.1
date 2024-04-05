"use client";

import { LockIcon } from "lucide-react";

import { useParams } from "next/navigation";
import { LoadingPage } from "~/components/global/loading";
import ServerError from "~/components/global/server-error";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

import NoResults from "~/components/global/no-results";
import { Skeleton } from "~/components/ui/skeleton";
import MessageCard from "../_components/message-card";
import NotesCard from "../_components/notes-card";
import PaymentsCard from "../_components/payments-card";
import ProjectPageHeader from "../_components/project-page-header";
import StageSelector from "../_components/stage-selector";
import TasksCard from "../_components/tasks-card";

export default function ProjectPage() {
  const { id } = useParams();
  const projectQuery = api.projects.getById.useQuery({
    id: id?.toString() ?? "",
  });
  const project = projectQuery.data;

  const agencyQuery = api.agency.getById.useQuery({
    id: project?.agencyId ?? "",
  });
  const agency = agencyQuery.data;

  const messagesQuery = api.messages.getByProjectId.useQuery({
    projectId: id?.toString() ?? "",
  });
  const messages = messagesQuery.data;

  const tasksQuery = api.tasks.getByProjectId.useQuery({
    projectId: id?.toString() ?? "",
  });
  const tasks = tasksQuery.data;

  const paymentsQuery = api.payments.getByProjectId.useQuery({
    projectId: id?.toString() ?? "",
  });
  const payments = paymentsQuery.data;

  if (projectQuery.isLoading) return <LoadingPage />;
  if (projectQuery.error ?? !project)
    return (
      <ServerError
        code={404}
        message="The project you are looking for does not exist."
      />
    );

  return (
    <article className="space-y-5">
      {(projectQuery.isLoading || agencyQuery.isLoading) && (
        <Skeleton className="h-36 w-full" />
      )}
      {project && agency && (
        <ProjectPageHeader
          project={project}
          participants={[...project.contacts, ...agency.users]}
        />
      )}

      {/* Displays reversed in mobile mode with flex,
          displays in columns as screen size increases */}
      <main className="content flex flex-col-reverse md:grid md:grid-cols-2 md:space-x-10 lg:grid-cols-5">
        {/* Messages */}
        <section className="space-y-5 md:col-span-1 lg:col-span-3">
          <Input placeholder="Type a message..." />
          <h3 className="text-sm font-light text-muted-foreground">
            Recent Activity
          </h3>
          {messagesQuery.isLoading && (
            <>
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </>
          )}
          {(!messages || messages?.length === 0) && (
            <NoResults
              src={"/images/no-data.svg"}
              alt={"Two empty clipboards"}
              text={"No messages yet. Start the conversation!"}
            />
          )}
          {messages?.map(
            (message) =>
              message && <MessageCard key={message.id} message={message} />,
          )}
        </section>

        {/* Project Details */}
        <Card className="project-details mb-auto rounded-sm bg-transparent md:col-span-1 lg:col-span-2">
          <CardHeader className="flex-row items-center gap-3">
            {agencyQuery.isLoading && (
              <>
                <Skeleton className="h-10 w-10 rounded-full" />
              </>
            )}
            {agency && (
              <Avatar>
                <AvatarImage src={agency.avatar ?? ""} alt="Agency Logo" />
                <AvatarFallback>{agency.name[0]}</AvatarFallback>
              </Avatar>
            )}
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
            {tasksQuery.isLoading && <Skeleton className="h-14 w-full" />}
            {tasks && <TasksCard tasks={tasks} />}
            {paymentsQuery.isLoading && <Skeleton className="h-14 w-full" />}
            {payments && <PaymentsCard payments={payments} />}
            <NotesCard notes={project.notes ?? ""} />
          </CardContent>
        </Card>
      </main>
    </article>
  );
}
