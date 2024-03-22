import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const collectionRouter = createTRPCRouter({
  getByProjectId: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input, ctx }) => {
      const collections = await ctx.db.collection.findMany({
        where: { projectId: input.projectId },
      });

      if (!collections) return undefined;

      return collections;
    }),
});
