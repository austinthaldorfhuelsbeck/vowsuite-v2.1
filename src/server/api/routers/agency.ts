import { type Agency } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addAccountDataToAgency = async (agency: Agency) => {
  const accounts = await db.account.findMany({
    where: { agencyId: agency.id },
  });

  return {
    ...agency,
    accounts,
  };
};

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

      return addAccountDataToAgency(agency);
    }),
});
