import { currentUser } from "@clerk/nextjs";
import { type Agency } from "@prisma/client";
import Image from "next/image";
import ServerError from "~/components/global/server-error";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
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

function LeadsCard(props: { agency?: Agency }) {
  return (
    <Card className="flex-1 rounded-sm shadow sm:min-h-96">
      <CardHeader>
        <CardTitle>Leads</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
    </Card>
  );
}

function ActivityCard(props: { agency?: Agency }) {
  return (
    <Card className="flex-1 rounded-sm shadow sm:min-h-96">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <p className="text-muted-foreground">New message from God.</p>
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
        <LeadsCard agency={userFromDb.agency} />
        <ActivityCard agency={userFromDb.agency} />
      </div>
      <pre>{JSON.stringify(userFromDb, null, "\t")}</pre>
    </>
  );
}
