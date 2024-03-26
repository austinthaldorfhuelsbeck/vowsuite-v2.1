import { type Message } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addDataToMessage = async (message: Message) => {
  const user =
    (await db.user.findUnique({
      where: { id: message.userId ?? "" },
    })) ?? undefined;
  const contact =
    (await db.contact.findUnique({
      where: { id: message.contactId ?? "" },
    })) ?? undefined;
  const project = await db.project.findUnique({
    where: { id: message.projectId },
  });

  if (!project)
    throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });

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

  getByProjectId: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input, ctx }) => {
      const messages = await ctx.db.message.findMany({
        where: { projectId: input.projectId },
        orderBy: { createdAt: "desc" },
      });

      return Promise.all(messages.map(addDataToMessage));
    }),

  getByAgencyId: publicProcedure
    .input(z.object({ agencyId: z.string() }))
    .query(async ({ input }) => {
      const projects = await db.project.findMany({
        where: { agencyId: input.agencyId },
      });
      const messages = await db.message.findMany({
        where: { projectId: { in: projects.map((project) => project.id) } },
        orderBy: { createdAt: "desc" },
      });

      return Promise.all(messages.map(addDataToMessage));
    }),
});
