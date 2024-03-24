import { type Agency, type Message, type Project } from "@prisma/client";
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

const addDataToAgency = async (agency: Agency) => {
  const users = await db.user.findMany({
    where: { agencyId: agency.id },
  });

  return {
    ...agency,
    users,
  };
};

const addDataToProject = async (project: Project) => {
  const agency = await db.agency.findUnique({
    where: { id: project.agencyId },
  });
  const event = await db.event.findUnique({
    where: { projectId: project.id },
  });
  const collection = await db.collection.findUnique({
    where: { projectId: project.id },
  });
  const messages = await db.message.findMany({
    where: {
      projectId: project.id,
    },
    orderBy: { createdAt: "desc" },
  });
  const tasks = await db.task.findMany({
    where: { projectId: project.id },
  });
  const contacts = await db.contact.findMany({
    where: { projectId: project.id },
  });
  const permissions = await db.permission.findMany({
    where: { projectId: project.id },
  });
  const payments = await db.payment.findMany({
    where: { projectId: project.id },
  });

  return {
    ...project,
    agency: agency && (await addDataToAgency(agency)),
    event,
    collection,
    messages: await Promise.all(messages.map(addDataToMessage)),
    payments,
    tasks,
    contacts,
    permissions,
  };
};

export const projectRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.id },
      });

      if (!project) return undefined;

      return addDataToProject(project);
    }),

  getByAgencyId: publicProcedure
    .input(z.object({ agencyId: z.string() }))
    .query(async ({ input, ctx }) => {
      const projects = await ctx.db.project.findMany({
        where: { agencyId: input.agencyId },
      });

      if (!projects) return undefined;

      return Promise.all(projects.map(addDataToProject));
    }),
});
