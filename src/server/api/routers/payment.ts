import { type Payment } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const addDataToPayment = async (payment: Payment) => {
  const project = await db.project.findUnique({
    where: { id: payment.projectId },
  });
  const contact = await db.contact.findUnique({
    where: { id: payment.contactId ?? "" },
  });

  return {
    ...payment,
    project,
    contact,
  };
};

export const paymentRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const payment = await ctx.db.payment.findUnique({
        where: { id: input.id },
      });

      if (!payment) return undefined;

      return addDataToPayment(payment);
    }),

  getByProjectId: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input, ctx }) => {
      const payments = await ctx.db.payment.findMany({
        where: { projectId: input.projectId },
        orderBy: { createdAt: "desc" },
      });

      return Promise.all(payments.map(addDataToPayment));
    }),

  getByContactId: publicProcedure
    .input(z.object({ contactId: z.string() }))
    .query(async ({ input, ctx }) => {
      const payments = await ctx.db.payment.findMany({
        where: { contactId: input.contactId },
        orderBy: { createdAt: "desc" },
      });

      return Promise.all(payments.map(addDataToPayment));
    }),

  getByAgencyId: publicProcedure
    .input(z.object({ agencyId: z.string() }))
    .query(async ({ input }) => {
      const projects = await db.project.findMany({
        where: { agencyId: input.agencyId },
      });
      const payments = await db.payment.findMany({
        where: { projectId: { in: projects.map((project) => project.id) } },
        orderBy: { createdAt: "desc" },
      });

      return Promise.all(payments.map(addDataToPayment));
    }),
});
