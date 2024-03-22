import { InfoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

export default async function ActivityCard(props: { agencyId: string }) {
  const projects = await api.projects.getByAgencyId({
    agencyId: props.agencyId,
  });
  return (
    <Card className="rounded-sm shadow">
      <CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="flex space-x-2">
                <span>Messages (0)</span>
                <InfoIcon size={16} className="my-auto" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Unread messages from your projects.</p>
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
