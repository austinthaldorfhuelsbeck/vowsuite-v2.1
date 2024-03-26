"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { type MessageWithData } from "~/types";

export default function MessageCard(props: { message: MessageWithData }) {
  const { message } = props;
  return (
    <Card key={message.id} className="rounded-sm">
      <CardHeader className="flex-row items-center justify-between gap-2">
        <Avatar>
          <AvatarImage
            src={message.contact?.avatar ?? message.user?.avatar ?? ""}
            alt={message.contact?.firstName ?? message.user?.firstName}
          />
          <AvatarFallback>
            {message.contact?.firstName[0] ?? message.user?.firstName[0]}
            {message.contact?.lastName[0] ?? message.user?.lastName[0]}
          </AvatarFallback>
        </Avatar>

        <div className="mr-auto flex flex-col">
          <p className="text-sm font-semibold">
            {message.contact?.firstName ?? message.user?.firstName}{" "}
            {message.contact?.lastName ?? message.user?.lastName}
          </p>
          <p className="text-sm font-light">{message.subject}</p>
        </div>

        <time className="text-sm text-muted-foreground">
          {message.createdAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </time>
      </CardHeader>

      <Separator />

      <CardContent className="pt-5">
        <div
          className="font-light"
          dangerouslySetInnerHTML={{ __html: message.body }}
        />
      </CardContent>

      <CardFooter>
        {message.read && (
          <Badge className="my-auto ml-auto space-x-1">
            <EyeIcon size={16} />
            <p>Read</p>
          </Badge>
        )}
        {!message.read && (
          <Badge className="my-auto ml-auto space-x-1">
            <EyeOffIcon size={16} />
            <p>Unread</p>
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}
