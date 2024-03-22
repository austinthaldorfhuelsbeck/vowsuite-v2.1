import { type Message } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addDataToMessage = async (message: Message) => {
  const user = message.userId
    ? await db.user.findUnique({
        where: { id: message.userId },
      })
    : undefined;
  const contact = message.contactId
    ? await db.contact.findUnique({
        where: { id: message.contactId },
      })
    : undefined;
  const project = await db.project.findUnique({
    where: { id: message.projectId },
  });

  return {
    ...message,
    user,
    contact,
    project,
  };
};

export const messageRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const message = await ctx.db.message.findUnique({
        where: { id: input.id },
      });

      if (!message) return undefined;

      return addDataToMessage(message);
    }),
});
