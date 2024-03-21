import { type User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addAgencyDataToUser = async (user: User) => {
  const agency =
    (await db.agency.findFirst({
      where: { id: user.agencyId ?? undefined },
    })) ?? undefined;

  return {
    ...user,
    agency,
  };
};

export const userRouter = createTRPCRouter({
  getByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!user) return undefined;

      return await addAgencyDataToUser(user);
    }),

  createByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.create({
        data: {
          email: input.email,
        },
      });

      return await addAgencyDataToUser(user);
    }),

  addAgency: publicProcedure
    .input(z.object({ userId: z.string(), agencyId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.update({
        where: { id: input.userId },
        data: {
          agencyId: input.agencyId,
        },
      });

      return await addAgencyDataToUser(user);
    }),
});
