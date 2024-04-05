import { type User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addDataToUser = async (user: User) => {
  const permission =
    (await db.permission.findUnique({
      where: { userId: user.id },
    })) ?? undefined;

  const messages =
    (await db.message.findMany({
      where: { userId: user.id },
    })) ?? [];

  const notifications =
    (await db.notification.findMany({
      where: { userId: user.id },
    })) ?? [];

  const tasks =
    (await db.task.findMany({
      where: { userId: user.id },
    })) ?? [];

  return {
    ...user,
    permission,
    messages,
    notifications,
    tasks,
  };
};

export const userRouter = createTRPCRouter({
  getOrCreateByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Check if user exists
      let user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      // If user does not exist, create user and agency
      if (!user) {
        user = await ctx.db.user.create({
          data: {
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
          },
        });

        const agency = await ctx.db.agency.create({
          data: {
            name: `${user.firstName} ${user.lastName}'s Agency`,
            email: input.email,
          },
        });

        await ctx.db.permission.create({
          data: {
            userId: user.id,
            agencyId: agency.id,
            role: "ADMIN",
          },
        });
      }

      return await addDataToUser(user);
    }),
});
