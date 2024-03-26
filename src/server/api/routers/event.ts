import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  // getById: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(async ({ input, ctx }) => {
  //     const events = await ctx.db.event.findMany({
  //       where: { id: input.id },
  //     });

  //     if (!events) return undefined;

  //     return events;
  //   }),

  getByProjectId: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input, ctx }) => {
      const event = await ctx.db.event.findUnique({
        where: { projectId: input.projectId },
      });

      return event;
    }),
});
