"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { LoadingPage } from "~/components/global/loading";
import NoResults from "~/components/global/no-results";
import ServerError from "~/components/global/server-error";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import TaskTable from "../_components/task-table";

export default function TasksPage() {
  const { user: clerkUser, isLoaded: clerkUserIsLoaded } = useUser();
  const getOrCreateByEmailMutation = api.user.getOrCreateByEmail.useMutation();
  const email = clerkUser?.emailAddresses[0]?.emailAddress;

  useEffect(() => {
    if (email) getOrCreateByEmailMutation.mutate({ email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const userFromDb = getOrCreateByEmailMutation.data;

  const tasksQuery = api.tasks.getByUserId.useQuery({
    userId: userFromDb?.id ?? "",
  });
  const uncompletedTasks = tasksQuery.data?.filter((task) => !task.completed);

  if (!clerkUserIsLoaded) return <LoadingPage />;

  if (!clerkUser)
    return (
      <ServerError
        code={401}
        message="You are unauthorized to make that request."
      />
    );

  if (getOrCreateByEmailMutation.error)
    return (
      <ServerError
        code={500}
        message="Could not load user resource. Please try again."
      />
    );

  return (
    <Card className="border-none bg-transparent">
      <CardHeader>
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-bold">Task Management</CardTitle>
          <CardDescription>
            Track all tasks assigned to you, reassign tasks, or filter to get a
            better overview.
          </CardDescription>
        </div>
      </CardHeader>

      {(!uncompletedTasks || uncompletedTasks.length === 0) && (
        <CardContent>
          <NoResults
            src="/images/relaxing-at-home.svg"
            alt="Lying on the couch at home, reading a book."
            text="No tasks match your current filter."
            size={200}
          />
        </CardContent>
      )}

      {uncompletedTasks && uncompletedTasks.length > 0 && userFromDb && (
        <CardContent>
          <TaskTable
            tasks={uncompletedTasks}
            projects={userFromDb.agency.projects}
            userId={userFromDb.id}
          />
        </CardContent>
      )}
    </Card>
  );
}
