import { currentUser } from "@clerk/nextjs";
import ServerError from "~/components/global/server-error";
import {
  createCardConfig,
  exploreCardConfig,
  leadsCardConfig,
  messagesCardConfig,
  tasksCardConfig,
  upcomingEventsCardConfig,
} from "~/lib/constants";
import { api } from "~/trpc/server";
import { DashboardCard } from "./_components/dashboard-card";
import DashboardHeader from "./_components/dashboard-header";
import DashboardLinksCard from "./_components/dashboard-links-card";
import {
  EventMenuItem,
  LeadMenuItem,
  MessageMenuItem,
  TaskMenuItem,
} from "./_components/dashboard-menu-items";
import MobileAppAlert from "./_components/mobile-app-alert";
import PaymentsCard from "./_components/payments-card";
import StatsCard from "./_components/stats-card";
import Navigation from "./_components/studio-navigation";

// uses tailwind queries to render three distinct layouts:
// mobile, tablet, and desktop
export default async function Studio() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress ?? "";

  // This function will load the user from the database if it exists,
  // or create it if it doesn't and also create a new agency
  const loadOrCreateUser = async (email: string) => {
    const userResponse = await api.user.getByEmail({
      email,
    });

    if (!userResponse) {
      const newUserResponse = await api.user.createByEmail({
        email,
      });

      const newAgencyResponse = await api.agency.createByUser({
        firstName: user?.firstName ?? "New User",
        email,
      });

      const updatedUserResponse = await api.user.addAgency({
        userId: newUserResponse.id,
        agencyId: newAgencyResponse.id,
      });

      return updatedUserResponse;
    }

    return userResponse;
  };

  const userFromDb = await loadOrCreateUser(userEmail);

  if (!user || !userFromDb.agencyId)
    return (
      <ServerError
        code={500}
        message="Could not load user resource. Please try again."
      />
    );

  // Fetch data for cards
  const projects = await api.projects.getByAgencyId({
    agencyId: userFromDb.agencyId,
  });

  const leads = projects?.filter((project) => project.stage === "LEAD");
  const leadsData = leads?.map((lead) => (
    <LeadMenuItem key={lead.id} leadId={lead.id} />
  ));

  const upcomingEvents = projects
    ?.flatMap((project) => project.event)
    .filter((event) => event?.date && event.date > new Date());
  const upcomingEventsData = upcomingEvents?.map(
    (event) => event && <EventMenuItem key={event?.id} event={event} />,
  );

  const unreadMessages = projects
    ?.flatMap((project) => project.messages)
    .filter((message) => !message.read);
  const messagesData = unreadMessages?.map((message) => (
    <MessageMenuItem key={message.id} messageId={message.id} />
  ));

  const tasks = (
    await api.tasks.getByUserId({
      userId: userFromDb.id,
    })
  ).filter((task) => !task.completed);
  const tasksData = tasks?.map((task) => (
    <TaskMenuItem
      key={task.id}
      task={task}
      project={task.project ?? undefined}
    />
  ));

  return (
    <>
      <Navigation
        imageUrl={user.imageUrl}
        firstName={user.firstName ?? "Vowsuite"}
        lastName={user.lastName ?? "User"}
      />
      <div className="mx-auto my-5 max-w-4xl px-5 xl:max-w-7xl">
        <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          <div className="sm:col-span-2 xl:col-span-3">
            <DashboardHeader
              firstName={user.firstName}
              agency={userFromDb.agency}
            />
          </div>

          <div className="inline-block sm:hidden">
            <MobileAppAlert />
          </div>

          {/* Stats Card */}
          <div className="mt-0 hidden sm:col-span-2 sm:inline-block xl:col-span-3">
            <StatsCard agencyId={userFromDb.agencyId} />
          </div>

          {/* Leads Card */}
          <div className="hidden sm:row-span-2 sm:inline-block">
            <DashboardCard
              {...leadsCardConfig}
              title={`Leads (${leads?.length})`}
              data={leadsData}
            />
          </div>

          {/* Upcoming Events Card */}
          <div className="hidden sm:row-span-2 sm:inline-block">
            <DashboardCard
              {...upcomingEventsCardConfig}
              title={`Upcoming Events (${upcomingEvents?.length})`}
              data={upcomingEventsData}
            />
          </div>

          {/* Messages Card */}
          <div className="hidden sm:row-span-1 sm:inline-block xl:col-span-1 xl:row-span-2">
            <DashboardCard
              {...messagesCardConfig}
              title={`Messages (${unreadMessages?.length})`}
              data={messagesData}
            />
          </div>

          {/* Create New Card */}
          <div className="sm:row-span-1">
            <DashboardLinksCard {...createCardConfig} />
          </div>

          {/* Payments Card */}
          <div className="hidden sm:col-span-1 sm:inline-block xl:col-span-2 xl:row-span-2">
            <PaymentsCard agencyId={userFromDb.agencyId} />
          </div>

          {/* Tasks Card */}
          <div className="hidden sm:inline-block">
            <DashboardCard
              {...tasksCardConfig}
              title={`Tasks (${tasks?.length})`}
              data={tasksData}
            />
          </div>

          {/* Explore Card */}
          <div className="sm:col-span-2 xl:col-span-3">
            <DashboardLinksCard {...exploreCardConfig} />
          </div>
        </div>
      </div>
    </>
  );
}
