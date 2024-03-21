import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const agencyRouter = createTRPCRouter({
  createByUser: publicProcedure
    .input(z.object({ firstName: z.string(), email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const agency = await ctx.db.agency.create({
        data: {
          name: `${input.firstName}'s Agency`,
          email: input.email,
          avatar: "/assets/user-placeholder.jpg",
          fontPrimary: "Georgia",
          fontSecondary: "Helvetica",
          colorAccent: "#ffbe98",
          colorBackground: "#f2e8da",
          colorText: "#1c1917",
          plan: "BASIC",
        },
      });

      return agency;
    }),
});
