"use client";

import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
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
import NoResults from "../../../components/global/no-results";

interface DashboardCardProps {
  title: string;
  tooltipContent: string;
  data: (JSX.Element | null)[] | undefined;
  noDataSrc: string;
  noDataAlt: string;
  noDataText: string;
  footerLink: string;
  footerText: string;
}

export const DashboardCard = ({
  title,
  tooltipContent,
  data,
  noDataSrc,
  noDataAlt,
  noDataText,
  footerLink,
  footerText,
}: DashboardCardProps) => (
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

    {!data ||
      (data?.length === 0 && (
        <CardContent className="my-10 mt-auto flex items-center justify-center p-0">
          <NoResults src={noDataSrc} alt={noDataAlt} text={noDataText} />
        </CardContent>
      ))}
    {data && data?.length > 0 && (
      <CardContent className="p-0">{data}</CardContent>
    )}

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
