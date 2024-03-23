import { type Task } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addDataToTask = async (task: Task) => {
  const project = await db.project.findUnique({
    where: { id: task.projectId },
  });

  return {
    ...task,
    project,
  };
};

export const taskRouter = createTRPCRouter({
  getByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const tasks = await ctx.db.task.findMany({
        where: { userId: input.userId },
      });

      if (!tasks) return [];

      return Promise.all(tasks.map(addDataToTask));
    }),
});
