import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
    <div className="my-10 flex flex-col items-center space-y-3">
      <Image
        src="/images/done-checking.svg"
        width={125}
        height={125}
        alt="Looking up at three floating checked tasks"
      />
      <p className="text-center text-sm text-muted-foreground">
        You&#39;ve read all your messages. <br /> Way to go! 🎉
      </p>
    </div>
  );
}

async function MessageMenuItem(props: { messageId: string }) {
  const message = await api.messages.getById({ id: props.messageId });

  if (!message?.contact) return null;

  return (
    <Link href={`/studio/message/${message.id}`} passHref>
      <div className="flex cursor-pointer justify-between p-3 transition-all ease-in-out hover:bg-secondary">
        <Avatar className="mr-3">
          <AvatarImage
            src={message.contact.avatar ?? undefined}
            alt="Contact avatar"
          />
          <AvatarFallback>
            {`${message.contact.firstName[0]}${message.contact.lastName[0]}`}
          </AvatarFallback>
        </Avatar>
        <div className="mr-auto flex flex-col space-y-1">
          <p className="text-sm">{`${message.contact.firstName} ${message.contact.lastName}`}</p>
          <p className="text-xs text-muted-foreground">
            {message.project?.name}
          </p>
        </div>
        <p className="my-auto text-xs text-muted-foreground">
          {message.createdAt.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

export default async function MessagesCard(props: { agencyId: string }) {
  const projects = await api.projects.getByAgencyId({
    agencyId: props.agencyId,
  });
  const unreadMessages = projects
    ?.flatMap((project) => project.messages)
    .filter((message) => !message.read);

  return (
    <Card className="flex h-full flex-col justify-between rounded-sm shadow">
      <CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="mr-auto flex space-x-2">
                <span>{`Messages (${unreadMessages?.length ?? 0})`}</span>
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

      {unreadMessages?.length === 0 && (
        <CardContent className="my-10 flex items-center justify-center p-0">
          <NotFound />
        </CardContent>
      )}
      {unreadMessages && unreadMessages.length > 0 && (
        <CardContent className="p-0">
          {unreadMessages.map((message) => {
            return <MessageMenuItem key={message.id} messageId={message.id} />;
          })}
        </CardContent>
      )}

      <CardFooter className="mt-auto p-0">
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
