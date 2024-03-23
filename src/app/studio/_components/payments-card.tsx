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

function SubtotalMenuItem(props: {
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

async function PaymentMenuItem(props: { paymentId: string }) {
  const payment = await api.payments.getById({ id: props.paymentId });

  if (!payment) {
    return null;
  }

  return (
    <Link href={`/studio/payment/${payment.id}`} passHref>
      <div className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary">
        <div className="flex flex-col space-y-1">
          <p className="text-sm">{`$${payment.amount}`}</p>
          <p className="text-xs text-muted-foreground">
            {payment.project?.name ?? "No project"}
          </p>
          {payment.contact && (
            <p className="text-xs text-muted-foreground">
              {`${payment.contact.firstName} ${payment.contact.lastName}`}
            </p>
          )}
        </div>
        <p className="my-auto text-xs text-muted-foreground">
          {payment.date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

export default async function PaymentsCard(props: { agencyId: string }) {
  const projects = await api.projects.getByAgencyId({
    agencyId: props.agencyId,
  });
  const paymentsCurrentMonth =
    projects
      ?.flatMap((project) => project.payments)
      .filter((payment) => payment.date.getMonth === new Date().getMonth) ?? [];
  const paymentsPaid = paymentsCurrentMonth.filter(
    (payment) => payment.status === "PAID",
  );
  const paymentsProcessing = paymentsCurrentMonth.filter(
    (payment) => payment.status === "PENDING",
  );
  const paymentsUpcoming = paymentsCurrentMonth.filter(
    (payment) => !payment.status,
  );
  const paymentsOverdue = paymentsCurrentMonth.filter(
    (payment) =>
      payment.date < new Date() &&
      (!payment.status || payment.status === "FAILED"),
  );
  const subtotalMenuItems = [
    {
      title: "Paid",
      amount: paymentsPaid.reduce((acc, payment) => acc + payment.amount, 0),
      color: "#22c55e",
    },
    {
      title: "Processing",
      amount: paymentsProcessing.reduce(
        (acc, payment) => acc + payment.amount,
        0,
      ),
      color: "#fbbf24",
    },
    {
      title: "Upcoming",
      amount: paymentsUpcoming.reduce(
        (acc, payment) => acc + payment.amount,
        0,
      ),
      color: "#78716c",
    },
    {
      title: "Overdue",
      amount: paymentsOverdue.reduce((acc, payment) => acc + payment.amount, 0),
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
                <span>{`Payments (${paymentsCurrentMonth?.length ?? 0})`}</span>
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
                      <span>{`Total overdue payments (${paymentsOverdue?.length})`}</span>
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
              <TabsTrigger value="paid">{`Paid/Processing (${paymentsPaid?.length + paymentsProcessing?.length})`}</TabsTrigger>
              <TabsTrigger value="upcoming">{`Upcoming (${paymentsUpcoming?.length})`}</TabsTrigger>
              <TabsTrigger value="overdue">{`Overdue (${paymentsOverdue?.length})`}</TabsTrigger>
            </TabsList>

            <TabsContent value="paid">
              <Card className="flex h-full flex-col justify-between rounded-sm shadow">
                <CardHeader>
                  <CardDescription>
                    Payments that have been paid or are currently processing.
                  </CardDescription>
                </CardHeader>
                {paymentsPaid.length === 0 &&
                  paymentsProcessing.length === 0 && (
                    <CardContent className="flex flex-col items-center justify-center p-0">
                      <NotFound message="No payments are being processed at the moment." />
                      <Link href="/studio/invoices">
                        <Button variant="link" className="my-3">
                          Create an invoice
                        </Button>
                      </Link>
                    </CardContent>
                  )}
                {(paymentsPaid.length > 0 || paymentsProcessing.length > 0) && (
                  <CardContent className="p-0">
                    {paymentsPaid.map((payment) => (
                      <PaymentMenuItem
                        key={payment.id}
                        paymentId={payment.id}
                      />
                    ))}
                    {paymentsProcessing.map((payment) => (
                      <PaymentMenuItem
                        key={payment.id}
                        paymentId={payment.id}
                      />
                    ))}
                  </CardContent>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="upcoming">
              <Card className="flex h-full flex-col justify-between rounded-sm shadow">
                <CardHeader>
                  <CardDescription>
                    Payments that are scheduled to be paid in the future.
                  </CardDescription>
                </CardHeader>
                {paymentsUpcoming.length === 0 && (
                  <CardContent className="flex flex-col items-center justify-center p-0">
                    <NotFound message="No payments scheduled for the rest of this month." />
                    <Link href="/studio/invoices">
                      <Button variant="link" className="mt-3">
                        Create an invoice
                      </Button>
                    </Link>
                  </CardContent>
                )}
                {paymentsUpcoming.length > 0 && (
                  <CardContent className="p-0">
                    {paymentsUpcoming.map((payment) => (
                      <PaymentMenuItem
                        key={payment.id}
                        paymentId={payment.id}
                      />
                    ))}
                  </CardContent>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="overdue">
              <Card className="flex h-full flex-col justify-between rounded-sm shadow">
                <CardHeader>
                  <CardDescription>
                    Payments that are past their due date.
                  </CardDescription>
                </CardHeader>
                {paymentsOverdue.length === 0 && (
                  <CardContent className="flex flex-col items-center justify-center p-0">
                    <NotFound message="No overdue payments this month." />
                    <Link href="/studio/invoices">
                      <Button variant="link" className="my-3">
                        Create an invoice
                      </Button>
                    </Link>
                  </CardContent>
                )}
                {paymentsOverdue.length > 0 && (
                  <CardContent className="p-0">
                    {paymentsOverdue.map((payment) => (
                      <PaymentMenuItem
                        key={payment.id}
                        payment={payment}
                        project={
                          projects?.find(
                            (project) => project.id === payment.projectId,
                          ) ?? undefined
                        }
                      />
                    ))}
                  </CardContent>
                )}
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
