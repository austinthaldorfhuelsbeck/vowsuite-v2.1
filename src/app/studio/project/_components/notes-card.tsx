"use client";

import { useState } from "react";

import { MinusIcon, PencilLineIcon, PlusIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Textarea } from "~/components/ui/textarea";

export default function NotesCard(props: { notes: string }) {
  const { notes } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="rounded-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <CardHeader className="flex-row items-center gap-3 p-3 text-primary">
          <PencilLineIcon size={24} />
          <CardTitle className="text-md mr-auto font-semibold">Notes</CardTitle>
          <CollapsibleTrigger
            asChild
            className="cursor-pointer rounded transition-all ease-in-out hover:scale-95"
          >
            {isOpen ? <MinusIcon size={24} /> : <PlusIcon size={24} />}
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent className="space-y-2">
          <CardContent>
            <Textarea placeholder={notes} className="min-h-36" />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
