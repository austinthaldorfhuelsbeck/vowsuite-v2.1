"use client";

import { type Project } from "@prisma/client";
import {
  ArrowUpRightFromSquareIcon,
  CheckIcon,
  ChevronDownIcon,
  CircleCheckIcon,
  CircleIcon,
  FilterIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { TaskWithData } from "~/types";
import useFilterTasks from "../_hooks/useFilterTasks";
import CreateTaskButton from "./create-task-button";
import TaskCheckButton from "./task-check-button";
import { TaskDatePicker } from "./task-date-picker";
import TaskDeleteButton from "./task-delete-button";
import { TaskNameInput } from "./task-name-input";

export default function TaskTable(props: {
  tasks: (TaskWithData | undefined)[];
  projects: Project[];
  userId: string;
}) {
  const {
    filteredTasks,
    setFilteredTasks,
    hideCompleted,
    toggleHideCompleted,
    showOnlyCompleted,
    toggleShowOnlyCompleted,
    showOnlyOverdue,
    toggleShowOnlyOverdue,
    showOnlyToday,
    toggleShowOnlyToday,
    showOnlyThisWeek,
    toggleShowOnlyThisWeek,
  } = useFilterTasks({ tasks: props.tasks });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="mr-auto flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="space-x-2">
                <p>Create task</p>
                <ChevronDownIcon className="my-auto h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {props.projects.map((project) => (
                <CreateTaskButton
                  key={project.id}
                  project={project}
                  userId={props.userId}
                  setTasks={setFilteredTasks}
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="flex space-x-2">
                <FilterIcon className="my-auto h-5 w-5" />
                <span>Filter tasks</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={(e) => toggleShowOnlyToday(e)}
                  className={`flex items-center space-x-2 ${
                    showOnlyToday ? "text-primary" : ""
                  }`}
                >
                  <p>Today</p>
                  {showOnlyToday && <CheckIcon size={20} className="m-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => toggleShowOnlyThisWeek(e)}
                  className={`flex items-center space-x-2 ${
                    showOnlyThisWeek ? "text-primary" : ""
                  }`}
                >
                  <p>This week</p>
                  {showOnlyThisWeek && (
                    <CheckIcon size={20} className="m-auto" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => toggleShowOnlyOverdue(e)}
                  className={`flex items-center space-x-2 ${
                    showOnlyOverdue ? "text-primary" : ""
                  }`}
                >
                  <p>Overdue</p>
                  {showOnlyOverdue && (
                    <CheckIcon size={20} className="m-auto" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => toggleShowOnlyCompleted(e)}
                  className={`flex items-center space-x-2 ${
                    showOnlyCompleted ? "text-primary" : ""
                  }`}
                >
                  <p>Completed</p>
                  {showOnlyCompleted && (
                    <CheckIcon size={20} className="m-auto" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={hideCompleted}
            onCheckedChange={toggleHideCompleted}
            id="hide-completed"
          />
          <Label htmlFor="hide-completed" className="text-muted-foreground">
            Hide completed
          </Label>
        </div>
      </div>

      {filteredTasks && filteredTasks.length > 0 && (
        <Table className="font-extralight">
          <TableHeader className="font-semibold">
            <TableRow className="hover:bg-transparent">
              <TableHead />
              <TableHead>Task</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Assigned to</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map(
              (task) =>
                task && (
                  <TableRow
                    key={task.id}
                    className={`text-xs tracking-wider ${task.completed && "text-muted-foreground hover:bg-transparent"}`}
                  >
                    <TableCell>
                      <TaskCheckButton
                        taskId={task.id}
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
                                if (hideCompleted)
                                  setFilteredTasks((tasks) =>
                                    tasks.filter((t) => !t?.completed),
                                  );
                              }
                        }
                      >
                        {task.completed && (
                          <CircleCheckIcon size={20} className="m-auto" />
                        )}
                        {!task.completed && (
                          <CircleIcon
                            size={20}
                            className="m-auto cursor-pointer"
                          />
                        )}
                      </TaskCheckButton>
                    </TableCell>
                    <TableCell>
                      <TaskNameInput
                        taskId={task.id}
                        initialName={task.title}
                        onNameChange={(newName) => {
                          setFilteredTasks((tasks) =>
                            tasks.map((t) =>
                              t?.id === task.id
                                ? { ...task, title: newName }
                                : t,
                            ),
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TaskDatePicker
                        taskId={task.id}
                        initialDate={task.dueDate}
                        onDateChange={(dueDate) => {
                          setFilteredTasks((tasks) =>
                            tasks.map((t) =>
                              t?.id === task.id ? { ...task, dueDate } : t,
                            ),
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-5">
                        <p>{task.project?.name}</p>
                        <Link
                          href={`/studio/project/${task.project?.id}`}
                          target="_blank"
                        >
                          <ArrowUpRightFromSquareIcon className="my-auto h-4 w-4" />
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        className="flex gap-2 px-2 text-xs font-extralight"
                        disabled={task.completed}
                      >
                        <p className="m-0">{task.user?.email}</p>
                        <ChevronDownIcon className="my-auto h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <TaskDeleteButton
                        taskId={task.id}
                        onCompletedChange={(taskId) => {
                          setFilteredTasks((tasks) =>
                            tasks.filter((t) => t?.id !== taskId),
                          );
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ),
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
