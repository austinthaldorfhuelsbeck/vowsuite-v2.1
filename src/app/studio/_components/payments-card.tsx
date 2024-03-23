import {
  ArrowRightIcon,
  CircleHelpIcon,
  CircleIcon,
  InfoIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/server";

function NotFound(props: { message?: string }) {
  return (
    <div className="mt-10 flex flex-col items-center space-y-3">
      <Image
        src="/images/no-data.svg"
        width={125}
        height={125}
        alt="Two empty clipboards"
      />
      <p className="text-center text-sm text-muted-foreground">
        {props.message ?? "No payments found."}
      </p>
    </div>
  );
}

async function SubtotalMenuItem(props: {
  title: string;
  amount: number;
  color: string;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <p className="flex space-x-1">
        <CircleIcon
          size={12}
          className="my-auto"
          style={{ color: props.color }}
        />
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
      color: "#22c55e",
    },
    {
      title: "Processing",
      amount: 0,
      color: "#fbbf24",
    },
    {
      title: "Upcoming",
      amount: 0,
      color: "#78716c",
    },
    {
      title: "Overdue",
      amount: 0,
      color: "#dc2626",
    },
  ];

  return (
    <Card className="flex h-full flex-col justify-between rounded-sm shadow">
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

      <CardContent className="my-auto px-0">
        <div className="flex px-5 pt-3">
          <div className="flex flex-1 flex-col space-y-3">
            <>
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
            </>

            <div className="grid grid-cols-2 gap-2">
              {subtotalMenuItems.map((item) => (
                <SubtotalMenuItem key={item.title} {...item} />
              ))}
            </div>

            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h2 className="flex space-x-2 text-sm text-muted-foreground">
                      <span>{`Total overdue payments (${payments.length})`}</span>
                      <CircleHelpIcon size={16} className="my-auto" />
                    </h2>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      This includes the total amount of all overdue payments,
                      including this month and previous months.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="mt-2 text-3xl font-semibold">$0</div>
            </>
          </div>

          <Tabs defaultValue="paid" className="hidden xl:inline-block">
            <TabsList className="grid w-full grid-cols-3 bg-primary/30 text-card-foreground">
              <TabsTrigger value="paid">{`Paid/Processing (${payments.length})`}</TabsTrigger>
              <TabsTrigger value="upcoming">{`Upcoming (${payments.length})`}</TabsTrigger>
              <TabsTrigger value="overdue">{`Overdue (${payments.length})`}</TabsTrigger>
            </TabsList>

            <TabsContent value="paid">
              <Card className="flex h-full flex-col justify-between rounded-sm shadow">
                <CardHeader>
                  <CardTitle>Paid/Processing</CardTitle>
                  <CardDescription>
                    Payments that have been paid or are currently processing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-0">
                  <NotFound message="No payments are being processed at the moment." />
                  <Link href="/studio/invoices">
                    <Button variant="link" className="my-3">
                      Create an invoice
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming">
              <Card className="flex h-full flex-col justify-between rounded-sm shadow">
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                  <CardDescription>
                    Payments that are scheduled to be paid in the future.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-0">
                  <NotFound message="No payments scheduled for the rest of this month." />
                  <Link href="/studio/invoices">
                    <Button variant="link" className="mt-3">
                      Create an invoice
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overdue">
              <Card className="flex h-full flex-col justify-between rounded-sm shadow">
                <CardHeader>
                  <CardTitle>Overdue</CardTitle>
                  <CardDescription>
                    Payments that are past their due date.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-0">
                  <NotFound message="No overdue payments this month." />

                  <Link href="/studio/invoices">
                    <Button variant="link" className="my-3">
                      Create an invoice
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-0">
        <Link href="/studio/payments">
          <Button variant="link" className="flex space-x-2">
            <span>Go to payments</span>
            <ArrowRightIcon size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
