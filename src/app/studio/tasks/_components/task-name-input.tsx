import React, { useState } from "react";
import { LoadingSpinner } from "~/components/global/loading";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

interface TaskNameInputProps {
  taskId: string;
  initialName: string;
  onNameChange: (newName: string) => void;
}

export const TaskNameInput: React.FC<TaskNameInputProps> = ({
  taskId,
  initialName,
  onNameChange,
}) => {
  const [name, setName] = useState(initialName);
  const { mutate, isPending } = api.tasks.update.useMutation();

  const handleBlur = () => {
    // Update the task name in the database and call the onNameChange callback
    mutate(
      { taskId, title: name },
      {
        onSuccess: () => {
          onNameChange(name);
        },
      },
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur(); // Triggers handleBlur
    }
  };

  return (
    <div className="flex items-center">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="m-0 border-none p-1 focus:ring-0"
      />
      {isPending && <LoadingSpinner size={20} />}
    </div>
  );
};
