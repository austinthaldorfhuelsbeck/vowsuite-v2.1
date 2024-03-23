import type { Project, Task, User } from "@prisma/client";

export interface TaskWithData extends Task {
  project: Project | null;
  user: User | null;
}
