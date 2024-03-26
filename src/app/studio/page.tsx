"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { LoadingPage } from "~/components/global/loading";
import NoResults from "~/components/global/no-results";
import ServerError from "~/components/global/server-error";
import { Skeleton } from "~/components/ui/skeleton";
import {
  createCardConfig,
  exploreCardConfig,
  leadsCardConfig,
  messagesCardConfig,
  tasksCardConfig,
  upcomingEventsCardConfig,
} from "~/lib/constants";
import { api } from "~/trpc/react";
import { type MessageWithData, type ProjectWithData } from "~/types";
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

export default function Studio() {
  const { user: clerkUser, isLoaded: clerkUserIsLoaded } = useUser();
  const getOrCreateByEmailMutation = api.user.getOrCreateByEmail.useMutation();
  const email = clerkUser?.emailAddresses[0]?.emailAddress;

  useEffect(() => {
    if (email)
      getOrCreateByEmailMutation.mutate({
        email,
        firstName: clerkUser?.firstName ?? undefined,
        lastName: clerkUser?.lastName ?? undefined,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const userFromDb = getOrCreateByEmailMutation.data;

  const projectsQuery = api.projects.getByAgencyId.useQuery({
    agencyId: userFromDb?.agencyId ?? "",
  });
  const messagesQuery = api.messages.getByAgencyId.useQuery({
    agencyId: userFromDb?.agencyId ?? "",
  });
  const paymentsQuery = api.payments.getByAgencyId.useQuery({
    agencyId: userFromDb?.agencyId ?? "",
  });

  const leads = projectsQuery.data?.filter(
    (project) => project.stage === "LEAD",
  );
  const unreadMessages = messagesQuery.data?.filter((message) => !message.read);
  const upcomingEvents = projectsQuery.data
    ?.flatMap((project) => project.event)
    .filter((event) => event?.date && event.date > new Date());

  const tasksQuery = api.tasks.getByUserId.useQuery({
    userId: userFromDb?.id ?? "",
  });
  const uncompletedTasks = tasksQuery.data?.filter((task) => !task.completed);
  const payments = paymentsQuery.data;

  if (!clerkUserIsLoaded) return <LoadingPage />;

  if (!clerkUser)
    return (
      <ServerError
        code={401}
        message="You are unauthorized to make that request."
      />
    );

  if (getOrCreateByEmailMutation.error)
    return (
      <ServerError
        code={500}
        message="Could not load user resource. Please try again."
      />
    );

  // uses tRPC conditions and Skeleton components to render all loading states
  // Uses tailwind queries to render three distinct layouts:
  // mobile, tablet, and desktop

  return (
    <>
      <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        <div className="sm:col-span-2 xl:col-span-3">
          {userFromDb && (
            <DashboardHeader
              firstName={userFromDb.firstName}
              agencyName={userFromDb.agency?.name}
              agencyAvatar={userFromDb.agency?.avatar ?? undefined}
            />
          )}
          {!userFromDb && (
            <div className="flex items-center gap-3">
              <Skeleton className="ml-1 mr-4 h-16 w-16 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-6 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
              <div className="ml-auto mr-1 flex flex-col items-center space-y-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          )}
        </div>

        <div className="inline-block sm:hidden">
          <MobileAppAlert />
        </div>

        {/* Stats Card */}
        <div className="mt-0 hidden sm:col-span-2 sm:inline-block xl:col-span-3">
          {(!userFromDb || projectsQuery.isLoading) && (
            <Skeleton className="h-28 w-full rounded" />
          )}
          {userFromDb && projectsQuery.isSuccess && leads && unreadMessages && (
            <StatsCard leads={leads} messages={unreadMessages} />
          )}
        </div>

        {/* Leads Card */}
        <div className="hidden sm:row-span-2 sm:inline-block">
          {(!userFromDb || projectsQuery.isLoading) && (
            <Skeleton className="h-64 w-full rounded" />
          )}
          {userFromDb && projectsQuery.isSuccess && leads && (
            <DashboardCard
              {...leadsCardConfig}
              title={`Leads (${leads?.length})`}
            >
              {leads.length ? (
                leads.map((lead) => (
                  <LeadMenuItem key={lead.id} lead={lead as ProjectWithData} />
                ))
              ) : (
                <div className="my-10 mt-auto flex items-center justify-center">
                  <NoResults
                    src={leadsCardConfig.noDataSrc}
                    alt={leadsCardConfig.noDataAlt}
                    text={leadsCardConfig.noDataText}
                  />
                </div>
              )}
            </DashboardCard>
          )}
        </div>

        {/* Upcoming Events Card */}
        <div className="hidden sm:row-span-2 sm:inline-block">
          {(!userFromDb || projectsQuery.isLoading) && (
            <Skeleton className="h-64 w-full rounded" />
          )}
          {userFromDb && projectsQuery.isSuccess && upcomingEvents && (
            <DashboardCard
              {...upcomingEventsCardConfig}
              title={`Upcoming Events (${upcomingEvents?.length})`}
            >
              {upcomingEvents.length ? (
                upcomingEvents.map(
                  (event) =>
                    event && <EventMenuItem key={event?.id} event={event} />,
                )
              ) : (
                <div className="my-10 mt-auto flex items-center justify-center">
                  <NoResults
                    src={upcomingEventsCardConfig.noDataSrc}
                    alt={upcomingEventsCardConfig.noDataAlt}
                    text={upcomingEventsCardConfig.noDataText}
                  />
                </div>
              )}
            </DashboardCard>
          )}
        </div>

        {/* Messages Card */}
        <div className="hidden sm:row-span-1 sm:inline-block xl:col-span-1 xl:row-span-2">
          {(!userFromDb || projectsQuery.isLoading) && (
            <Skeleton className="h-64 w-full rounded" />
          )}
          {userFromDb && projectsQuery.isSuccess && unreadMessages && (
            <DashboardCard
              {...messagesCardConfig}
              title={`Messages (${unreadMessages?.length})`}
            >
              {unreadMessages.length ? (
                unreadMessages.map((message) => (
                  <MessageMenuItem
                    key={message.id}
                    message={message as MessageWithData}
                  />
                ))
              ) : (
                <div className="my-10 mt-auto flex items-center justify-center">
                  <NoResults
                    src={messagesCardConfig.noDataSrc}
                    alt={messagesCardConfig.noDataAlt}
                    text={messagesCardConfig.noDataText}
                  />
                </div>
              )}
            </DashboardCard>
          )}
        </div>

        {/* Create New Card */}
        <div className="sm:row-span-1">
          {!userFromDb && <Skeleton className="h-36 w-full rounded" />}
          {userFromDb && <DashboardLinksCard {...createCardConfig} />}
        </div>

        {/* Payments Card */}
        <div className="hidden sm:col-span-1 sm:inline-block xl:col-span-2 xl:row-span-2">
          {(!userFromDb || !payments) && (
            <Skeleton className="xl:h-128 h-64 w-full rounded xl:h-96" />
          )}
          {userFromDb && payments && <PaymentsCard payments={payments} />}
        </div>

        {/* Tasks Card */}
        <div className="hidden sm:inline-block">
          {(!userFromDb || tasksQuery.isLoading) && (
            <Skeleton className="h-64 w-full rounded" />
          )}
          {userFromDb && tasksQuery.isSuccess && uncompletedTasks && (
            <DashboardCard
              title={`Tasks (${uncompletedTasks?.length})`}
              {...tasksCardConfig}
            >
              {uncompletedTasks.length ? (
                uncompletedTasks.map((task) => (
                  <TaskMenuItem key={task.id} task={task} />
                ))
              ) : (
                <div className="my-10 mt-auto flex items-center justify-center">
                  <NoResults
                    src={tasksCardConfig.noDataSrc}
                    alt={tasksCardConfig.noDataAlt}
                    text={tasksCardConfig.noDataText}
                  />
                </div>
              )}
            </DashboardCard>
          )}
        </div>

        {/* Explore Card */}
        <div className="sm:col-span-2 xl:col-span-3">
          {!userFromDb && <Skeleton className="h-36 w-full rounded" />}
          {userFromDb && <DashboardLinksCard {...exploreCardConfig} />}
        </div>
      </div>
    </>
  );
}
