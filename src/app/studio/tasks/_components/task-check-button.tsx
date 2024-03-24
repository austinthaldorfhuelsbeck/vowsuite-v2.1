import { type PropsWithChildren } from "react";
import { LoadingSpinner } from "~/components/global/loading";
import { api } from "~/trpc/react";

interface TaskNameButtonProps {
  taskId: string;
  onCompletedChange: (taskId: string) => void;
}

export default function TaskCheckButton({
  taskId,
  onCompletedChange,
  children,
}: PropsWithChildren<TaskNameButtonProps>) {
  const { mutate, isPending } = api.tasks.toggleCompleted.useMutation();

  // Update the task name in the database and call the onCompletedChange callback
  return (
    <div
      onClick={() => {
        mutate(
          { taskId },
          {
            onSuccess: () => {
              onCompletedChange(taskId);
            },
          },
        );
      }}
    >
      {isPending && <LoadingSpinner size={20} />}
      {!isPending && children}
    </div>
  );
}
