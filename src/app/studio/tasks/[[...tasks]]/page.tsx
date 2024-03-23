import { currentUser } from "@clerk/nextjs";
import NoResults from "~/components/global/no-results";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/server";
import TaskTable from "../_components/taskTable";

export default async function TasksPage() {
  const user = await currentUser();

  const userFromDb = await api.user.getByEmail({
    email: user?.emailAddresses[0]?.emailAddress ?? "",
  });

  if (!user || !userFromDb) {
    return null;
  }

  // Fetch tasks from the server
  const tasks = await api.tasks.getByUserId({
    userId: userFromDb.id,
  });

  return (
    <Card className="border-none bg-transparent">
      <CardHeader className="flex-row justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-bold">Task Management</CardTitle>
          <CardDescription>
            Track all tasks assigned to you, reassign tasks, or filter to get a
            better overview.
          </CardDescription>
        </div>
        <Button>Create task</Button>
      </CardHeader>

      {(!tasks || tasks.length === 0) && (
        <CardContent>
          <NoResults
            src="/images/relaxing-at-home.svg"
            alt="Lying on the couch at home, reading a book."
            text="No tasks match your current filter."
            size={200}
          />
        </CardContent>
      )}

      {tasks && tasks.length > 0 && (
        <CardContent>
          <TaskTable tasks={tasks} />
        </CardContent>
      )}
    </Card>
  );
}
