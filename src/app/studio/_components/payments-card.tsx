import {
  ArrowRightIcon,
  CircleHelpIcon,
  CircleIcon,
  InfoIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/server";

async function SubtotalMenuItem(props: {
  title: string;
  amount: number;
  color: string;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <p className="flex space-x-1">
        <CircleIcon size={12} className={`my-auto text-${props.color}-500`} />
        <span className="text-sm text-muted-foreground">{props.title}</span>
      </p>
      <div className="font-semibold">{`$${props.amount}`}</div>
    </div>
  );
}

export default async function PaymentsCard(props: { agencyId: string }) {
  const projects = await api.projects.getByAgencyId({
    agencyId: props.agencyId,
  });
  const payments = [];

  const subtotalMenuItems = [
    {
      title: "Paid",
      amount: 0,
      color: "green",
    },
    {
      title: "Processing",
      amount: 0,
      color: "yellow",
    },
    {
      title: "Upcoming",
      amount: 0,
      color: "stone",
    },
    {
      title: "Overdue",
      amount: 0,
      color: "red",
    },
  ];

  return (
    <Card className="rounded-sm shadow">
      <CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="mr-auto flex space-x-2">
                <span>{`Payments (${payments?.length ?? 0})`}</span>
                <InfoIcon size={16} className="my-auto" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                An overview of the month&#39;s expected payments: Paid,
                processing, upcoming, and overdue.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <Separator />
      <div className="flex px-5 pt-3">
        <div className="flex-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h2 className="flex space-x-2 text-sm text-muted-foreground">
                  <span>{`${new Date().toLocaleDateString("en-us", {
                    month: "long",
                  })} gross payments`}</span>
                  <CircleHelpIcon size={16} className="my-auto" />
                </h2>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {`This includes the gross amount of all payments made during ${new Date().toLocaleDateString("en-us", { month: "long" })}.`}
                </p>
                <br />
                <ul style={{ listStyle: "inside" }}>
                  <li>Includes tips, fees, taxes, and discounts.</li>
                  <li>Does not include chargebacks or refunds.</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="mt-2 text-3xl font-semibold">$0</div>

          <div className="grid grid-cols-2 gap-2">
            {subtotalMenuItems.map((item) => (
              <SubtotalMenuItem key={item.title} {...item} />
            ))}
          </div>
        </div>
        <div className="flex-1 bg-green-400"></div>
      </div>
      <CardFooter className="p-0">
        <Link href="/studio/payments" passHref>
          <Button variant="link" className="flex space-x-2">
            <span>Go to payments</span>
            <ArrowRightIcon size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
