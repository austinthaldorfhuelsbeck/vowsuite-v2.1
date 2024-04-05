import type {
  Agency,
  Collection,
  Contact,
  Event,
  Message,
  Notification,
  Payment,
  Permission,
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
  permission: Permission | null;
}

export interface AgencyWithData extends Agency {
  users: User[];
  projects: Project[];
}

export interface ProjectWithData extends Project {
  // messages: Message[];
  // tasks: Task[];
  event: Event | null;
  collection: Collection | null;
  // payments: Payment[];
  // agency: AgencyWithData;
  contacts: Contact[];
  // permissions: Permission[];
}

export interface MessageWithData extends Message {
  project: Project;
  user?: User;
  contact?: Contact;
}

export interface PaymentWithData extends Payment {
  project: Project;
  contact?: Contact;
}