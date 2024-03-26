"use client";

import { type Project } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import { DropdownMenuLabel } from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";
import { type TaskWithData } from "~/types";

export default function CreateTaskButton(props: {
  project: Project;
  userId: string;
  setTasks: Dispatch<SetStateAction<(TaskWithData | undefined)[]>>;
}) {
  const { project, userId } = props;
  const { id: projectId } = project;
  const { mutate } = api.tasks.create.useMutation({
    onSuccess: (data) => {
      props.setTasks((tasks) => [...tasks, data]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <DropdownMenuLabel
      className="flex cursor-pointer items-center space-x-2"
      onClick={() => mutate({ projectId, userId })}
    >
      <span>{project.name}</span>
      <PlusIcon size={16} />
    </DropdownMenuLabel>
  );
}
