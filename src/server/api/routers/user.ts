import { type User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addDataToUser = async (user: User) => {
  const agency =
    (await db.agency.findFirst({
      where: { id: user.agencyId ?? undefined },
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

  const projects = await db.project.findMany({
    where: { agencyId: agency?.id },
  });

  return {
    ...user,
    agency: {
      ...agency,
      projects,
    },
    messages,
    notifications,
    tasks,
  };
};

export const userRouter = createTRPCRouter({
  getOrCreateByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
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
          },
        });

        const agency = await ctx.db.agency.create({
          data: {
            name: `${user.firstName} ${user.lastName}'s Agency`,
            email: input.email,
          },
        });

        user = await ctx.db.user.update({
          where: { id: user.id },
          data: {
            agencyId: agency.id,
          },
        });
      }

      return await addDataToUser(user);
    }),
});
