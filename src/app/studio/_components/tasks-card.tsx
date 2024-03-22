import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/server";

async function TaskMenuItem(props: { taskId: string }) {
  return <></>;
}

export default async function TasksCard(props: { agencyId: string }) {
  const projects = await api.projects.getByAgencyId({
    agencyId: props.agencyId,
  });
  const tasks = [];

  return (
    <Card className="rounded-sm shadow">
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
      {/* {tasks && tasks.length > 0 && (
        <CardContent className="p-0">
          {tasks.map((task) => {
            // return <TaskMenuItem key={task.id} taskId={task.id} />;
            return <TaskMenuItem key={task.id} taskId={task.id} />;
          })}
        </CardContent>
      )} */}
      <CardFooter className="p-0">
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
