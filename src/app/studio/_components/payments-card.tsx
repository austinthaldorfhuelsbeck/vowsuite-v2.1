import { ArrowRightIcon, InfoIcon } from "lucide-react";
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

async function PaymentMenuItem(props: { paymentId: string }) {
  return <></>;
}

export default async function PaymentsCard(props: { agencyId: string }) {
  const projects = await api.projects.getByAgencyId({
    agencyId: props.agencyId,
  });
  const payments = [];

  return (
    <Card className="rounded-sm shadow">
      <CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="flex space-x-2">
                <span>{`Payments (${payments?.length ?? 0})`}</span>
                <InfoIcon size={16} className="my-auto" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Invoices from your projects.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <Separator />
      {/* {payments && payments.length > 0 && (
        <CardContent className="p-0">
          {payments.map((payment) => {
            // return <PaymentMenuItem key={payment.id} paymentId={payment.id} />;
            return <PaymentMenuItem key={payment.id} paymentId={payment.id} />;
          })}
        </CardContent>
      )} */}
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
