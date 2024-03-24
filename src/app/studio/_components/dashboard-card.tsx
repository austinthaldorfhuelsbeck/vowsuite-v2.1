import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import { type PropsWithChildren } from "react";
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

interface DashboardCardProps {
  title: string;
  tooltipContent: string;
  footerLink: string;
  footerText: string;
}

export const DashboardCard = (props: PropsWithChildren<DashboardCardProps>) => {
  const { children, title, tooltipContent, footerLink, footerText } = props;

  return (
    <Card className="flex h-full flex-col justify-between rounded-sm shadow">
      <CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="mr-auto flex space-x-2">
                <span>{title}</span>
                <InfoIcon size={16} className="my-auto" />
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>{tooltipContent}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">{children}</CardContent>

      <CardFooter className="mt-auto p-0">
        <Link href={footerLink} passHref>
          <Button variant="link" className="flex space-x-2">
            <span>{footerText}</span>
            <ArrowRightIcon size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
