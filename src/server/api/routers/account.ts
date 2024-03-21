import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const accountRouter = createTRPCRouter({
  getByAgencyId: publicProcedure
    .input(z.object({ agencyId: z.string() }))
    .query(async ({ input, ctx }) => {
      const accounts = await ctx.db.account.findMany({
        where: { agencyId: input.agencyId },
      });

      if (!accounts) return undefined;

      return accounts;
    }),
});
