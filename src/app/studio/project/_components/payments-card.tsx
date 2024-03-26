"use client";

import { useState } from "react";

import { ClipboardListIcon, MinusIcon, PlusIcon } from "lucide-react";

import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { type PaymentWithData } from "~/types";

import { DashboardCard } from "../../_components/dashboard-card";
import { PaymentMenuItem } from "../../_components/dashboard-menu-items";

export default function PaymentsCard(props: {
  payments: (PaymentWithData | undefined)[];
}) {
  const { payments } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="rounded-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <CardHeader className="flex-row items-center justify-between gap-3 p-3 text-primary">
          <ClipboardListIcon size={24} />
          <CardTitle className="text-md mr-auto font-semibold">{`Payments (${payments.length})`}</CardTitle>
          <CollapsibleTrigger
            asChild
            className="cursor-pointer rounded transition-all ease-in-out hover:scale-95"
          >
            {isOpen ? <MinusIcon size={24} /> : <PlusIcon size={24} />}
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent className="space-y-2">
          <DashboardCard className="border-none">
            {payments.map(
              (payment) =>
                payment && (
                  <div className="flex items-center" key={payment.id}>
                    <PaymentMenuItem payment={payment} />
                  </div>
                ),
            )}
          </DashboardCard>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
