import { currentUser } from "@clerk/nextjs";
import { type Agency } from "@prisma/client";
import { type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServerError from "~/components/global/server-error";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { createCardConfig, exploreCardConfig } from "~/lib/constants";
import { api } from "~/trpc/server";
import greeting from "~/utils/greeting";
import LeadsCard from "./_components/leads-card";
import MessagesCard from "./_components/messages-card";
import MobileAppAlert from "./_components/mobile-app-alert";
import PaymentsCard from "./_components/payments-card";
import StatsCard from "./_components/stats-card";
import TasksCard from "./_components/tasks-card";
import UpcomingEventsCard from "./_components/upcoming-events-card";

function DashboardHeader(props: { firstName: string | null; agency?: Agency }) {
  return (
    <div className="flex justify-between">
      <div className="flex space-x-5">
        <Image
          src="/images/happy-birthday.svg"
          width={75}
          height={75}
          alt="A gift wrapped with a bow and confetti"
        />
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <h1 className="text-2xl font-bold">{greeting(props.firstName)}</h1>
          <p className="text-sm text-muted-foreground">
            Thank you for being a part of the Vowsuite beta testing team.
          </p>
        </div>
      </div>
      {props.agency && (
        <Link href="/studio/settings/agency">
          <div className="flex flex-col space-y-2">
            <Image
              src={props.agency.avatar}
              width={50}
              height={50}
              alt="Agency logo"
              className="mx-auto rounded-full"
            />
            <p className="text-sm text-muted-foreground">{props.agency.name}</p>
          </div>
        </Link>
      )}
    </div>
  );
}

function LinksCard(props: {
  title: string;
  links: { title: string; href: string; icon: LucideIcon }[];
}) {
  return (
    <Card className="rounded-sm shadow">
      <CardHeader className="px-3 pb-0 pt-2">
        <h2 className="text-lg font-bold">{props.title}</h2>
      </CardHeader>
      <CardContent className="grid h-full grid-cols-2 gap-3 p-3">
        {props.links.map((link, idx) => (
          <Link key={idx} href={link.href}>
            <Card className="flex min-h-20 cursor-pointer flex-col items-center justify-center gap-1 text-sm transition-all ease-in-out hover:bg-muted">
              <link.icon className="h-4 w-4 text-primary" />
              <span>{link.title}</span>
            </Card>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

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

  return (
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

      <div className="mt-0 hidden sm:col-span-2 sm:inline-block xl:col-span-3">
        <StatsCard agencyId={userFromDb.agencyId} />
      </div>

      <div className="hidden sm:row-span-2 sm:inline-block">
        <LeadsCard agencyId={userFromDb.agencyId} />
      </div>

      <div className="hidden sm:row-span-2 sm:inline-block">
        <UpcomingEventsCard agencyId={userFromDb.agencyId} />
      </div>

      <div className="hidden sm:row-span-1 sm:inline-block xl:col-span-1 xl:row-span-2">
        <MessagesCard agencyId={userFromDb.agencyId} />
      </div>

      <div className="sm:row-span-1">
        <LinksCard {...createCardConfig} />
      </div>

      <div className="hidden sm:col-span-1 sm:inline-block xl:col-span-2 xl:row-span-2">
        <PaymentsCard agencyId={userFromDb.agencyId} />
      </div>

      <div className="hidden sm:inline-block">
        <TasksCard agencyId={userFromDb.agencyId} />
      </div>

      <div className="sm:col-span-2 xl:col-span-3">
        <LinksCard {...exploreCardConfig} />
      </div>
    </div>
  );
}
