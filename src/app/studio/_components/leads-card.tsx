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
    <div className="mt-5 flex flex-col items-center space-y-3">
      <Image
        src="/images/well-done.svg"
        width={125}
        height={125}
        alt="Relaxing with balloons, leaning on an empty notifications window"
      />
      <p className="text-center text-sm text-muted-foreground">
        You&#39;ve handled everything. <br /> Great job! 🎉
      </p>
      <Link href="/studio/pipeline">
        <Button variant="link">Show all</Button>
      </Link>
    </div>
  );
}

export default async function LeadsCard(props: { agencyId: string }) {
  const leads = (
    await api.projects.getByAgencyId({
      agencyId: props.agencyId,
    })
  )?.filter((project) => project.stage === "LEAD");

  return (
    <Card className="rounded-sm shadow">
      <CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="flex space-x-2">
                <span>{`Leads (${leads?.length})`}</span>
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
      <div className="sm:min-h-80">
        <CardContent className="p-0">
          {leads?.length === 0 && <NotFound />}
          {leads?.map((project) => {
            return (
              <Link
                key={project.id}
                href={`/studio/project/${project.id}`}
                passHref
              >
                <div className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm">{project.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {project.eventLocation}
                    </p>
                  </div>
                  <p className="my-auto text-xs text-muted-foreground">
                    {project.eventDate.toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            );
          })}
        </CardContent>
      </div>
      <CardFooter className="p-0">
        <Link href="/studio/pipeline" passHref>
          <Button variant="link" className="flex space-x-2">
            <span>Go to pipeline</span>
            <ArrowRightIcon size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
