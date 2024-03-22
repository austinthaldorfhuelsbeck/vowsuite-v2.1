import { currentUser } from "@clerk/nextjs";
import { type Agency } from "@prisma/client";
import { PersonIcon } from "@radix-ui/react-icons";
import {
  BadgeDollarSignIcon,
  BriefcaseBusinessIcon,
  FolderPenIcon,
  InfoIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServerError from "~/components/global/server-error";
import { Card, CardContent } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/server";
import greeting from "~/utils/greeting";
import LeadsCard from "./_components/leads-card";
import MessagesCard from "./_components/messages-card";
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

async function StatsCard(props: { agencyId: string }) {
  const projects = await api.projects.getByAgencyId({
    agencyId: props.agencyId,
  });
  const leads = projects?.filter((project) => project.stage === "LEAD");
  const unreadMessages = projects
    ?.flatMap((project) => project.messages)
    .filter((message) => !message.read);

  const stats = [
    {
      title: "New leads",
      tooltipContent:
        "Leads are potential clients who have shown interest through lead forms.",
      value: leads?.length ?? 0,
    },
    {
      title: "Unread messages",
      tooltipContent: "Unread messages from your projects.",
      value: unreadMessages?.length ?? 0,
    },
    {
      title: "Draft collections",
      tooltipContent:
        "Collections that you are still working on and haven't published yet.",
      value: 0,
    },
    {
      title: `${new Date().getFullYear()} bookings`,
      isCurrency: true,
      tooltipContent:
        "Total invoiced amount of all projects converted to booked status this year. Includes taxes and discounts.",
      value: 0,
    },
  ];

  return (
    <Card className="hidden rounded-sm shadow md:inline-block">
      <CardContent className="flex items-center justify-between divide-x px-0 py-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="mt-0 flex flex-1 flex-col items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="flex space-x-2 text-sm text-muted-foreground">
                    <span>{stat.title}</span>
                    <InfoIcon size={16} className="my-auto" />
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stat.tooltipContent}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h2 className="text-4xl font-bold">
              {stat.isCurrency && "$"}
              {stat.value}
            </h2>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function CreateCard() {
  const cards = [
    { title: "New lead", icon: PersonIcon },
    { title: "New project", icon: BriefcaseBusinessIcon },
    { title: "New collection", icon: FolderPenIcon },
    { title: "New invoice", icon: BadgeDollarSignIcon },
  ];

  return (
    <Card className="h-52 rounded-sm shadow">
      <CardContent className="grid h-full grid-cols-2 gap-3 p-3">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            className="flex cursor-pointer flex-col items-center justify-center gap-1 text-sm transition-all ease-in-out hover:bg-muted"
          >
            <card.icon className="h-4 w-4 text-primary" />
            <span>{card.title}</span>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

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
    <>
      <DashboardHeader firstName={user.firstName} agency={userFromDb.agency} />
      <StatsCard agencyId={userFromDb.agencyId} />
      <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3">
        <LeadsCard agencyId={userFromDb.agencyId} />
        <UpcomingEventsCard agencyId={userFromDb.agencyId} />
        <CreateCard />
        <MessagesCard agencyId={userFromDb.agencyId} />
      </div>
      {/* <pre>{JSON.stringify(userFromDb, null, "\t")}</pre> */}
    </>
  );
}
