import { type Project, type Task } from "@prisma/client";
import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/server";

function NotFound() {
  return (
    <div className="my-10 flex flex-col items-center space-y-3">
      <Image
        src="/images/relaxation.svg"
        width={125}
        height={125}
        alt="Relaxing on a hammock talking together as the sun sets in the background"
      />
      <p className="text-center text-sm text-muted-foreground">
        You&#39;ve handled everything.
        <br />
        Take a break! 🌅
      </p>
    </div>
  );
}

function TaskMenuItem(props: { task: Task; project?: Project }) {
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

export default async function TasksCard(props: { userId: string }) {
  const tasks = await api.tasks.getByUserId({
    userId: props.userId,
  });

  return (
    <Card className="flex h-full flex-col justify-between rounded-sm shadow">
      <CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="mr-auto flex space-x-2">
                <span>{`Tasks (${tasks?.length ?? 0})`}</span>
                <InfoIcon size={16} className="my-auto" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open tasks assigned to you.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>

      <Separator />

      {tasks?.length === 0 && (
        <CardContent className="flex items-center justify-center p-0">
          <NotFound />
        </CardContent>
      )}
      {tasks && tasks.length > 0 && (
        <CardContent className="p-0">
          {tasks.map((task) => {
            return (
              <TaskMenuItem
                key={task.id}
                task={task}
                project={task.project ?? undefined}
              />
            );
          })}
        </CardContent>
      )}

      <CardFooter className="mt-auto p-0">
        <Link href="/studio/tasks" passHref>
          <Button variant="link" className="flex space-x-2">
            <span>Go to tasks</span>
            <ArrowRightIcon size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
