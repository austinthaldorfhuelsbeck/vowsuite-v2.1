import { useEffect, useState, type SyntheticEvent } from "react";
import { type TaskWithData } from "~/types";

export default function useFilterTasks(props: {
  tasks: (TaskWithData | undefined)[];
}) {
  const { tasks } = props;
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const [hideCompleted, setHideCompleted] = useState(false);
  const toggleHideCompleted = () => setHideCompleted(!hideCompleted);

  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const toggleShowOnlyCompleted = (e: SyntheticEvent) => {
    e.preventDefault();
    setShowOnlyCompleted(!showOnlyCompleted);
  };

  const [showOnlyOverdue, setShowOnlyOverdue] = useState(false);
  const toggleShowOnlyOverdue = (e: SyntheticEvent) => {
    e.preventDefault();
    setShowOnlyOverdue(!showOnlyOverdue);
  };

  const [showOnlyToday, setShowOnlyToday] = useState(false);
  const toggleShowOnlyToday = (e: SyntheticEvent) => {
    e.preventDefault();
    setShowOnlyToday(!showOnlyToday);
  };

  const [showOnlyThisWeek, setShowOnlyThisWeek] = useState(false);
  const toggleShowOnlyThisWeek = (e: SyntheticEvent) => {
    e.preventDefault();
    setShowOnlyThisWeek(!showOnlyThisWeek);
  };

  useEffect(() => {
    let updatedTasks = tasks;

    // Convert conditions into a filtering function to apply all active filters efficiently.
    updatedTasks = updatedTasks.filter((task) => {
      const now = new Date();
      const todayStart = new Date(now.setHours(0, 0, 0, 0));
      const todayEnd = new Date(now.setHours(23, 59, 59, 999));
      const thisWeekStart = new Date(now.setDate(now.getDate() - now.getDay())); // Last Sunday
      const thisWeekEnd = new Date(
        now.setDate(now.getDate() - now.getDay() + 6),
      ); // Next Saturday

      let shouldBeIncluded = true; // Default to including the task.

      if (hideCompleted && task?.completed) {
        shouldBeIncluded = false;
      }

      if (showOnlyCompleted && !task?.completed) {
        shouldBeIncluded = false;
      }

      // Adjusting for showOnlyOverdue to also check if task is not completed.
      if (
        showOnlyOverdue &&
        task?.dueDate &&
        (task.dueDate >= now || task.completed)
      ) {
        shouldBeIncluded = false;
      }

      if (
        showOnlyToday &&
        task?.dueDate &&
        (task.dueDate < todayStart || task.dueDate > todayEnd)
      ) {
        shouldBeIncluded = false;
      }

      if (
        showOnlyThisWeek &&
        task?.dueDate &&
        (task.dueDate < thisWeekStart || task.dueDate > thisWeekEnd)
      ) {
        shouldBeIncluded = false;
      }

      return shouldBeIncluded;
    });

    setFilteredTasks(updatedTasks);
  }, [
    hideCompleted,
    showOnlyCompleted,
    showOnlyOverdue,
    showOnlyToday,
    showOnlyThisWeek,
    tasks,
  ]);

  return {
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
  };
}
