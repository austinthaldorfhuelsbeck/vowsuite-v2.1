import { type Message } from "@prisma/client";
import { InfoIcon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type ProjectWithData } from "~/types";

export default function StatsCard(props: {
  leads: ProjectWithData[];
  messages: Message[];
}) {
  const stats = [
    {
      title: "New leads",
      tooltipContent:
        "Leads are potential clients who have shown interest through lead forms.",
      value: props.leads?.length ?? 0,
    },
    {
      title: "Unread messages",
      tooltipContent: "Unread messages from your projects.",
      value: props.messages?.length ?? 0,
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
    <Card className="rounded-sm shadow">
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
