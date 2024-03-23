import { type Event } from "@prisma/client";
import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/server";

function NotFound() {
  return (
    <div className="flex flex-col items-center space-y-3">
      <Image
        src="/images/walking-outside.svg"
        width={125}
        height={125}
        alt="Walking outside with trees, birds, and a sun in the background"
      />
      <p className="text-center text-sm text-muted-foreground">
        There are no upcoming events. <br /> Let&#39;s find more clients! 🏃‍♀
      </p>
    </div>
  );
}

async function EventMenuItem(props: { event: Event }) {
  return (
    <Link href={`/studio/event/${props.event.id}`} passHref>
      <div className="border-1 mx-3 my-2 flex cursor-pointer justify-between rounded border transition-all ease-in-out hover:bg-secondary">
        <div className="mr-3 flex flex-col items-center rounded-l bg-primary px-3 py-2 text-primary-foreground">
          <p className="text-xl font-bold">{props.event.date.getDate()}</p>
          <p className="text-sm font-semibold">
            {props.event.date
              .toLocaleString("default", {
                month: "short",
              })
              .toUpperCase()}
          </p>
        </div>
        <div className="my-auto mr-auto flex flex-col space-y-1">
          <p className="text-sm">{props.event.name}</p>
          <p className="text-xs text-muted-foreground">
            {props.event.location}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default async function UpcomingEventsCard(props: { agencyId: string }) {
  const projects = await api.projects.getByAgencyId({
    agencyId: props.agencyId,
  });
  const upcomingEvents = projects
    ?.flatMap((project) => project.event)
    .filter((event) => event?.date && event.date > new Date());

  return (
    <Card className="flex h-full flex-col justify-between rounded-sm shadow">
      <CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="mr-auto flex space-x-2">
                <span>{`Upcoming Events (${upcomingEvents?.length ?? 0})`}</span>
                <InfoIcon size={16} className="my-auto" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Projects with an event that is in the future.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>

      <Separator />

      {upcomingEvents?.length === 0 && (
        <CardContent className="my-10 flex items-center justify-center p-0">
          <NotFound />
        </CardContent>
      )}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <CardContent className="p-0">
          {upcomingEvents.map((event) => {
            // return <EventMenuItem key={event.id} eventId={event.id} />;
            return event && <EventMenuItem key={event.id} event={event} />;
          })}
        </CardContent>
      )}

      <CardFooter className="mt-auto p-0">
        <Link href="/studio/calendar" passHref>
          <Button variant="link" className="flex space-x-2">
            <span>Go to calendar</span>
            <ArrowRightIcon size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
