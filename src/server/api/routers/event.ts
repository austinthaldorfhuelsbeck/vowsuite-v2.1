import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const events = await ctx.db.event.findMany({
        where: { id: input.id },
      });

      if (!events) return undefined;

      return events;
    }),
});
