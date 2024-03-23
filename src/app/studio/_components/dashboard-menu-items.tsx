import { type Event, type Project, type Task } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/server";

export async function LeadMenuItem(props: { leadId: string }) {
  const project = await api.projects.getById({ id: props.leadId });

  if (!project) return null;

  return (
    <Link href={`/studio/project/${project.id}`} passHref>
      <div className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary">
        <div className="flex flex-col space-y-1">
          <p className="text-sm">{project.name}</p>
          <p className="text-xs text-muted-foreground">
            {project.event?.location}
          </p>
        </div>
        <p className="my-auto text-xs text-muted-foreground">
          {project.event?.date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

export async function EventMenuItem(props: { event: Event }) {
  return (
    <Link href={`/studio/event/${props.event.id}`} passHref>
      <div className="border-1 mx-3 my-2 flex cursor-pointer justify-between rounded border transition-all ease-in-out hover:bg-secondary">
        <div className="mr-3 flex flex-col items-center rounded-l bg-primary px-3 py-2 text-primary-foreground">
          <p className="text-xl font-bold">{props.event.date.getDate()}</p>
          <p className="text-sm font-semibold">
            {props.event.date
              .toLocaleString("default", {
                month: "short",
              })
              .toUpperCase()}
          </p>
        </div>
        <div className="my-auto mr-auto flex flex-col space-y-1">
          <p className="text-sm">{props.event.name}</p>
          <p className="text-xs text-muted-foreground">
            {props.event.location}
          </p>
        </div>
      </div>
    </Link>
  );
}

export async function MessageMenuItem(props: { messageId: string }) {
  const message = await api.messages.getById({ id: props.messageId });

  if (!message?.contact) return null;

  return (
    <Link href={`/studio/message/${message.id}`} passHref>
      <div className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary">
        <Avatar className="mr-3">
          <AvatarImage
            src={message.contact.avatar ?? undefined}
            alt="Contact avatar"
          />
          <AvatarFallback>
            {`${message.contact.firstName[0]}${message.contact.lastName[0]}`}
          </AvatarFallback>
        </Avatar>
        <div className="mr-auto flex flex-col space-y-1">
          <p className="text-sm">{`${message.contact.firstName} ${message.contact.lastName}`}</p>
          <p className="text-xs text-muted-foreground">
            {message.project?.name}
          </p>
        </div>
        <p className="my-auto text-xs text-muted-foreground">
          {message.createdAt.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

export function TaskMenuItem(props: { task: Task; project?: Project }) {
  return (
    <Link href={`/studio/task/${props.task.id}`} passHref>
      <div className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary">
        <div className="flex flex-col space-y-1">
          <p className="text-sm">{props.task.title}</p>
          <p className="text-xs text-muted-foreground">
            {props.project?.name ?? "No project"}
          </p>
        </div>
        <p className="my-auto text-xs text-muted-foreground">
          {props.task.dueDate.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
