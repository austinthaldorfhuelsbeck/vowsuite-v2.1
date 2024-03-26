"use client";

import { useState } from "react";

import {
  CircleCheckIcon,
  CircleIcon,
  ClipboardListIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";

import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { type TaskWithData } from "~/types";

import { DashboardCard } from "../../_components/dashboard-card";
import { TaskMenuItem } from "../../_components/dashboard-menu-items";
import TaskCheckButton from "../../tasks/_components/task-check-button";

export default function TasksCard(props: { tasks: TaskWithData[] }) {
  const { tasks } = props;
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="rounded-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <CardHeader className="flex-row items-center justify-between gap-3 p-3 text-primary">
          <ClipboardListIcon size={24} />
          <CardTitle className="text-md mr-auto font-semibold">{`Tasks (${tasks.length})`}</CardTitle>
          <CollapsibleTrigger
            asChild
            className="cursor-pointer rounded transition-all ease-in-out hover:scale-95"
          >
            {isOpen ? <MinusIcon size={24} /> : <PlusIcon size={24} />}
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent className="space-y-2">
          <DashboardCard className="border-none">
            {filteredTasks.map((task) => (
              <div className="flex items-center" key={task.id}>
                <TaskCheckButton
                  key={task.id}
                  taskId={task.id}
                  className="px-3"
                  onCompletedChange={
                    task.completed
                      ? () => {
                          setFilteredTasks((tasks) =>
                            tasks.map((t) =>
                              t?.id === task.id
                                ? { ...task, completed: false }
                                : t,
                            ),
                          );
                        }
                      : () => {
                          setFilteredTasks((tasks) =>
                            tasks.map((t) =>
                              t?.id === task.id
                                ? { ...task, completed: true }
                                : t,
                            ),
                          );
                        }
                  }
                >
                  {task.completed && (
                    <CircleCheckIcon size={20} className="m-auto" />
                  )}
                  {!task.completed && (
                    <CircleIcon size={20} className="m-auto cursor-pointer" />
                  )}
                </TaskCheckButton>
                <TaskMenuItem task={task} />
              </div>
            ))}
          </DashboardCard>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
