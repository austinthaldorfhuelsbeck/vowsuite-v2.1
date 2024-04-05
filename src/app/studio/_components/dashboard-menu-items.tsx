import { type Event } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  type MessageWithData,
  type PaymentWithData,
  type ProjectWithData,
  type TaskWithData,
} from "~/types";

export async function LeadMenuItem(props: { lead: ProjectWithData }) {
  return (
    <Link href={`/studio/project/${props.lead.id}`} passHref>
      <div className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary">
        <div className="flex flex-col space-y-1">
          <p className="text-sm">{props.lead.name}</p>
          <p className="text-xs text-muted-foreground">
            {props.lead.event?.location}
          </p>
        </div>
        <p className="my-auto text-xs text-muted-foreground">
          {props.lead.event?.date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

export function EventMenuItem(props: { event: Event }) {
  return (
    <Link href={`/studio/project/${props.event.projectId}`} passHref>
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

export function MessageMenuItem(props: { message: MessageWithData }) {
  return (
    <Link href={`/studio/project/${props.message.projectId}`} passHref>
      <div className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary">
        <Avatar className="mr-3">
          <AvatarImage
            src={props.message.contact?.avatar ?? undefined}
            alt="Contact avatar"
          />
          <AvatarFallback>
            {`${props.message.contact?.firstName[0]}${props.message.contact?.lastName[0]}`}
          </AvatarFallback>
        </Avatar>
        <div className="mr-auto flex flex-col space-y-1">
          <p className="text-sm">{`${props.message.contact?.firstName} ${props.message.contact?.lastName}`}</p>
          <p className="text-xs text-muted-foreground">
            {props.message.project.name}
          </p>
        </div>
        <p className="my-auto text-xs text-muted-foreground">
          {props.message.createdAt.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

export function TaskMenuItem(props: { task: TaskWithData }) {
  return (
    <Link href={`/studio/task/${props.task.id}`} passHref className="w-full">
      <div className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary">
        <div className="flex flex-col space-y-1">
          <p className="text-sm">{props.task.title}</p>
          <p className="text-xs text-muted-foreground">
            {props.task.project?.name ?? "No project"}
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

export function PaymentMenuItem(props: { payment: PaymentWithData }) {
  const { payment } = props;
  return (
    <Link
      href={`/studio/payments?paymentId=${payment.id}`}
      passHref
      className="w-full"
    >
      <div className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary">
        <div className="flex flex-col space-y-1">
          <p className="text-sm">{`$${payment.amount}`}</p>
        </div>
        <p className="my-auto text-xs text-muted-foreground">
          {payment.date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
