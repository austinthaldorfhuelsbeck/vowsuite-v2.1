import type { Agency } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addDataToAgency = async (agency: Agency) => {
  const projects = await db.project.findMany({
    where: { agencyId: agency.id },
  });

  const users = await db.user.findMany({
    where: { agencyId: agency.id },
  });

  return {
    ...agency,
    projects,
    users,
  };
};

export const agencyRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const agency = await ctx.db.agency.findUnique({
        where: { id: input.id },
      });

      if (!agency) return undefined;

      return addDataToAgency(agency);
    }),

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

      return addDataToAgency(agency);
    }),
});
