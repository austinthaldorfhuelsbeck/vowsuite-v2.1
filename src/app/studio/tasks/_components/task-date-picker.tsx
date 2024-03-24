import React, { useState } from "react";
import { LoadingSpinner } from "~/components/global/loading";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { api } from "~/trpc/react";

interface TaskDatePickerProps {
  taskId: string;
  initialDate: Date;
  onDateChange: (dueDate: Date) => void;
}

export const TaskDatePicker: React.FC<TaskDatePickerProps> = ({
  taskId,
  initialDate,
  onDateChange,
}) => {
  const [dueDate, setDueDate] = useState(initialDate);
  const { mutate, isPending } = api.tasks.update.useMutation();

  const onChangeDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return; // Exit if no date is selected

    // Update the due date both in the database and locally
    mutate(
      { taskId, dueDate: selectedDate },
      {
        onSuccess: () => {
          setDueDate(selectedDate); // Update local state to reflect the new due date
          onDateChange(selectedDate); // Notify the parent component of the date change
        },
      },
    );
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <p className="cursor-pointer rounded px-2 py-1 transition-all ease-in-out hover:bg-muted">
            {dueDate.toLocaleDateString()}
          </p>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={dueDate} onSelect={onChangeDate} />
        </PopoverContent>
      </Popover>
      {isPending && <LoadingSpinner size={20} />}
    </div>
  );
};
