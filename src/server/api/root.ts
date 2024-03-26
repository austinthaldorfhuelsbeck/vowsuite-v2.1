import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { agencyRouter } from "./routers/agency";
import { collectionRouter } from "./routers/collection";
import { eventRouter } from "./routers/event";
import { messageRouter } from "./routers/message";
import { paymentRouter } from "./routers/payment";
import { projectRouter } from "./routers/project";
import { taskRouter } from "./routers/task";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  agency: agencyRouter,
  projects: projectRouter,
  collections: collectionRouter,
  messages: messageRouter,
  events: eventRouter,
  tasks: taskRouter,
  payments: paymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
