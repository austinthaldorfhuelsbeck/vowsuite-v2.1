import { type Task } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addDataToTask = async (task: Task) => {
  const project = await db.project.findUnique({
    where: { id: task.projectId },
  });
  const user = await db.user.findUnique({
    where: { id: task.userId ?? undefined },
  });

  return {
    ...task,
    project,
    user,
  };
};

export const taskRouter = createTRPCRouter({
  getByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const tasks = await ctx.db.task.findMany({
        where: { userId: input.userId },
        orderBy: { dueDate: "asc" },
      });

      if (!tasks) return [];

      return Promise.all(tasks.map(addDataToTask));
    }),

  toggleCompleted: publicProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.db.task.findUnique({
        where: { id: input.taskId },
      });

      if (!task) throw new Error("Task not found");

      const updatedTask = await ctx.db.task.update({
        where: { id: input.taskId },
        data: { completed: !task.completed },
      });

      return addDataToTask(updatedTask);
    }),

  create: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.db.task.create({
        data: {
          projectId: input.projectId,
          userId: input.userId,
        },
      });

      return addDataToTask(task);
    }),

  update: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        dueDate: z.date().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.db.task.update({
        where: { id: input.taskId },
        data: {
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
        },
      });

      return addDataToTask(task);
    }),

  changeUserId: publicProcedure
    .input(z.object({ taskId: z.string(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.db.task.update({
        where: { id: input.taskId },
        data: { userId: input.userId },
      });

      return addDataToTask(task);
    }),

  delete: publicProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.task.delete({
        where: { id: input.taskId },
      });

      return { deleted: true }; // Return an indicator of deletion
    }),
});
