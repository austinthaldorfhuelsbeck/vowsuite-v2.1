import { Plan, PrismaClient, Role, Stage, Status } from "@prisma/client";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

async function main() {
  // Delete existing records in reverse order of dependencies
  await prisma.notification.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.contact.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.agency.deleteMany({});
  await prisma.user.deleteMany({});

  // After clearing, seed Users
  const janeDoe = await prisma.user.create({
    data: {
      email: "jane.doe@example.com",
      firstName: "Jane",
      lastName: "Doe",
      avatar: "https://example.com/avatar/janedoe",
    },
  });

  const johnDoe = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      avatar: "https://example.com/avatar/johndoe",
    },
  });

  const austinThaldorfHuelsbeck = await prisma.user.create({
    data: {
      email: "austinthaldorfhuelsbeck@gmail.com",
      firstName: "Austin",
      lastName: "Thaldorf-Huelsbeck",
      avatar: "https://example.com/avatar/austinthaldorfhuelsbeck",
    },
  });

  // Seed Agencies
  const exampleAgency = await prisma.agency.create({
    data: {
      name: "Example Agency",
      email: "contact@exampleagency.com",
      plan: Plan.TRIAL,
    },
  });

  // Seed Projects, linking to Agency
  const projectAlpha = await prisma.project.create({
    data: {
      name: "Project Alpha",
      description: "A test project.",
      stage: Stage.ONGOING,
      agency: {
        connect: { id: exampleAgency.id },
      },
    },
  });
  const newLead = await prisma.project.create({
    data: {
      name: "Bird Person's Project",
      description: "New lead",
      stage: Stage.LEAD,
      agency: {
        connect: { id: exampleAgency.id },
      },
    },
  });

  // Seed Permissions for Jane Doe and Example Agency
  await prisma.permission.create({
    data: {
      role: Role.ADMIN,
      user: {
        connect: { id: austinThaldorfHuelsbeck.id },
      },
      agency: {
        connect: { id: exampleAgency.id },
      },
    },
  });

  // Seed Permissions for John Doe and Example Agency with USER role
  await prisma.permission.create({
    data: {
      role: Role.USER,
      user: {
        connect: { id: johnDoe.id },
      },
      agency: {
        connect: { id: exampleAgency.id },
      },
    },
  });

  // Seed Collections, linking to projects
  await prisma.collection.createMany({
    data: [
      {
        name: "Alpha Collection",
        projectId: projectAlpha.id,
        mediaType: "VIDEO",
        published: true,
      },
      {
        name: "Lead Collection",
        projectId: newLead.id,
        mediaType: "IMAGE",
      },
    ],
  });

  // Seed Contacts, linking to Project
  const charlieBrown = await prisma.contact.create({
    data: {
      firstName: "Charlie",
      lastName: "Brown",
      email: "charlie.brown@example.com",
      projectId: projectAlpha.id,
    },
  });
  const birdPerson = await prisma.contact.create({
    data: {
      firstName: "Bird",
      lastName: "Person",
      email: "bird@person.com",
      projectId: newLead.id,
    },
  });

  // Seed Payments, linking to Project Alpha and Contact Charlie Brown
  const payments = await prisma.payment.createMany({
    data: [
      {
        amount: 1000.0,
        date: DateTime.now().toJSDate(),
        status: Status.PAID,
        projectId: projectAlpha.id,
        contactId: charlieBrown.id,
      },
      {
        amount: 500.0,
        date: DateTime.now().plus({ days: 30 }).toJSDate(), // Future payment
        projectId: newLead.id,
        // No contact assigned to this future payment
      },
      {
        amount: 750.0,
        date: DateTime.now().minus({ days: 10 }).toJSDate(),
        status: Status.PAID,
        projectId: projectAlpha.id,
        contactId: charlieBrown.id,
      },
      {
        amount: 250.0,
        date: DateTime.now().minus({ days: 15 }).toJSDate(),
        projectId: projectAlpha.id,
        contactId: charlieBrown.id,
      },
    ],
  });

  // Seed Events, linking to projects and contacts
  await prisma.event.createMany({
    data: [
      {
        name: "Project Kickoff",
        description: "Kickoff meeting for Project Alpha.",
        date: DateTime.now().toJSDate(),
        location: "Zoom",
        projectId: projectAlpha.id,
      },
      {
        name: "Birdperson's Wedding",
        description: "Birdperson's wedding celebration.",
        date: DateTime.now().plus({ days: 60 }).toJSDate(),
        location: "Bird World",
        projectId: newLead.id,
      },
    ],
  });

  // Seed Unread Notifications for Jane Doe
  await prisma.notification.createMany({
    data: [
      {
        message: "You have a new message in Project Alpha.",
        userId: janeDoe.id,
        read: false,
      },
      {
        message: "Your task Initial Setup is overdue.",
        userId: janeDoe.id,
        read: false,
      },
      {
        message: "You have a new payment from Charlie Brown.",
        userId: austinThaldorfHuelsbeck.id,
        read: false,
      },
      {
        message: "You have a new payment from Charlie Brown.",
        userId: johnDoe.id,
        read: false,
      },
      {
        message: "You have a new payment from Charlie Brown.",
        userId: janeDoe.id,
        read: false,
      },
    ],
  });

  // Seed Unread Messages in Project Alpha
  await prisma.message.createMany({
    data: [
      {
        subject: "Urgent: Project Update",
        body: "We need to discuss the recent changes ASAP.",
        projectId: projectAlpha.id,
        contactId: charlieBrown.id,
        read: false,
      },
      {
        subject: "Reminder: Meeting Tomorrow",
        body: "Don't forget about our meeting scheduled for tomorrow.",
        projectId: projectAlpha.id,
        contactId: charlieBrown.id,
        read: false,
      },
      {
        subject: "Welcome to the project!",
        body: "We're excited to have you onboard.",
        projectId: projectAlpha.id,
        contactId: charlieBrown.id,
        read: true, // Marking this message as read
      },
      {
        subject: "My Wedding",
        body: "Hello! I am getting married later this year and I am interested in a quote for your photography services.",
        projectId: newLead.id,
        contactId: birdPerson.id,
        read: false,
      },
    ],
  });

  // Seed Tasks for John Doe, linking to Project Alpha
  await prisma.task.createMany({
    data: [
      {
        title: "Review Client Feedback",
        description:
          "Go through the feedback document from the client and make notes.",
        dueDate: DateTime.now().plus({ days: 3 }).toJSDate(),
        projectId: projectAlpha.id,
        userId: johnDoe.id,
      },
      {
        title: "Update Project Plan",
        description: "Incorporate the recent changes into the project plan.",
        dueDate: DateTime.now().plus({ days: 5 }).toJSDate(),
        projectId: projectAlpha.id,
        userId: johnDoe.id,
      },
      {
        title: "Finalize Project Scope",
        description: "Ensure the project scope is fully defined.",
        dueDate: DateTime.now().minus({ days: 5 }).toJSDate(),
        projectId: projectAlpha.id,
        userId: johnDoe.id,
        completed: true, // Marking this task as completed
      },
      {
        title: "Budget Review",
        description: "Review the project budget with the finance team.",
        dueDate: DateTime.now().plus({ days: 15 }).toJSDate(),
        projectId: newLead.id,
        userId: austinThaldorfHuelsbeck.id,
        completed: false,
      },
    ],
  });

  // Seed Tasks for Austin, linking to projects
  await prisma.task.createMany({
    data: [
      {
        title: "Initial Setup",
        description: "Set up the project environment.",
        dueDate: DateTime.now().plus({ days: 1 }).toJSDate(),
        projectId: projectAlpha.id,
        userId: austinThaldorfHuelsbeck.id,
      },
      {
        title: "Client Meeting",
        description: "Meet with the client to discuss the project.",
        dueDate: DateTime.now().plus({ days: 7 }).toJSDate(),
        projectId: projectAlpha.id,
        userId: austinThaldorfHuelsbeck.id,
      },
      {
        title: "Follow-up Call",
        description: "Follow up with the client regarding the project.",
        dueDate: DateTime.now().plus({ days: 10 }).toJSDate(),
        projectId: newLead.id,
        userId: austinThaldorfHuelsbeck.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
