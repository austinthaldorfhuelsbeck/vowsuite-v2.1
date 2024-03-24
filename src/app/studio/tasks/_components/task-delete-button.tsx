import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import { LoadingSpinner } from "~/components/global/loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";

interface TaskNameButtonProps {
  taskId: string;
  onCompletedChange: (taskId: string) => void;
}

export default function TaskDeleteButton({
  taskId,
  onCompletedChange,
}: TaskNameButtonProps) {
  const { mutate, isPending } = api.tasks.delete.useMutation();

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
      {!isPending && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVerticalIcon size={14} className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
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
              className="row items-center space-x-2"
            >
              <TrashIcon size={14} />
              <p>Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
