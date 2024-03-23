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
});
