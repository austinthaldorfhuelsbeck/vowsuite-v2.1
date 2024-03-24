import type {
  Agency,
  Message,
  Notification,
  Project,
  Task,
  User,
} from "@prisma/client";

export interface TaskWithData extends Task {
  project: Project | null;
  user: User | null;
}

export interface UserWithData extends User {
  agency?: Agency & { projects: Project[] };
  messages: (Message | undefined)[];
  notifications: (Notification | undefined)[];
  tasks: (Task | undefined)[];
}
