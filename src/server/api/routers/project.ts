import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getByAgencyId: publicProcedure
    .input(z.object({ agencyId: z.string() }))
    .query(async ({ input, ctx }) => {
      const projects = await ctx.db.project.findMany({
        where: { agencyId: input.agencyId },
      });

      if (!projects) return undefined;

      return projects;
    }),
});
