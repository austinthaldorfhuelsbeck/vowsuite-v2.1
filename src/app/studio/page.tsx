import { currentUser } from "@clerk/nextjs";
import { type Agency } from "@prisma/client";
import { InfoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServerError from "~/components/global/server-error";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/server";
import greeting from "~/utils/greeting";

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
      )}
    </div>
  );
}

function NotFound() {
  return (
    <div className="mt-5 flex flex-col items-center space-y-3">
      <Image
        src="/images/well-done.svg"
        width={125}
        height={125}
        alt="Relaxing with balloons, leaning on an empty notifications window"
      />
      <p className="text-center text-sm text-muted-foreground">
        You&#39;ve handled everything. <br /> Treat yourself 🍰
      </p>
      <Link href="/studio/pipeline">
        <Button variant="link">Show all</Button>
      </Link>
    </div>
  );
}

async function LeadsCard(props: { agencyId: string }) {
  const leads = (
    await api.accounts.getByAgencyId({
      agencyId: props.agencyId,
    })
  )?.filter((account) => account.stage === "LEAD");

  return (
    <Card className="flex-1 rounded-sm shadow">
      <CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="flex space-x-2">
                <span>Leads</span>
                <InfoIcon size={16} className="my-auto" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Leads are potential clients who have shown interest through lead
                forms.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 sm:min-h-80">
        {!leads && <NotFound />}
        {leads?.map((account) => {
          return (
            <div
              key={account.id}
              className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary"
            >
              <div className="flex flex-col space-y-1">
                <p className="text-sm">{account.name}</p>
                <p className="text-xs text-muted-foreground">
                  {account.eventLocation}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {account.eventDate.toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ActivityCard(props: { agencyId: string }) {
  return (
    <Card className="flex-1 rounded-sm shadow">
      <CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="flex space-x-2">
                <span>Messages</span>
                <InfoIcon size={16} className="my-auto" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Unread messages from your clients will appear here.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 sm:min-h-80">
        <NotFound />
      </CardContent>
    </Card>
  );
}

export default async function Studio() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!userEmail)
    return (
      <ServerError
        code={500}
        message="Something went wrong. Please try again."
      />
    );

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
        firstName: user.firstName ?? "New User",
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

  return (
    <>
      <DashboardHeader firstName={user.firstName} agency={userFromDb.agency} />
      <div className="flex flex-col gap-5 sm:flex-row">
        {userFromDb.agencyId && (
          <>
            <LeadsCard agencyId={userFromDb.agencyId} />
            <ActivityCard agencyId={userFromDb.agencyId} />
          </>
        )}
      </div>
      {/* <pre>{JSON.stringify(userFromDb, null, "\t")}</pre> */}
    </>
  );
}
