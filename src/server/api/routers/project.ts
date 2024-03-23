import { type Project } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addDataToProject = async (project: Project) => {
  const event = await db.event.findUnique({
    where: { projectId: project.id },
  });
  const collection = await db.collection.findUnique({
    where: { projectId: project.id },
  });
  const messages = await db.message.findMany({
    where: { projectId: project.id },
  });
  const payments = await db.payment.findMany({
    where: { projectId: project.id },
  });

  return {
    ...project,
    event,
    collection,
    messages,
    payments,
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
