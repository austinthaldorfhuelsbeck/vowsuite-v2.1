"use client";

import { useUser } from "@clerk/nextjs";
import {
  ArrowRightLeftIcon,
  CalendarClockIcon,
  EllipsisVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { LoadingPage } from "~/components/global/loading";
import ServerError from "~/components/global/server-error";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/react";
import NoResults from "../../../../components/global/no-results";

export default function PipelinePage() {
  const stages = ["ALL", "LEAD", "PROSPECT", "CLIENT", "COMPLETED", "ONGOING"];

  const { user: clerkUser, isLoaded: clerkUserIsLoaded } = useUser();
  const getOrCreateByEmailMutation = api.user.getOrCreateByEmail.useMutation();
  const email = clerkUser?.emailAddresses[0]?.emailAddress;

  useEffect(() => {
    if (email) getOrCreateByEmailMutation.mutate({ email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const userFromDb = getOrCreateByEmailMutation.data;

  const projectsQuery = api.projects.getByAgencyId.useQuery({
    agencyId: userFromDb?.agencyId ?? "",
  });
  const messagesQuery = api.messages.getByAgencyId.useQuery({
    agencyId: userFromDb?.agencyId ?? "",
  });

  const projects = projectsQuery.data;
  const messages = messagesQuery.data;

  if (!clerkUserIsLoaded) return <LoadingPage />;

  if (!clerkUser)
    return (
      <ServerError
        code={401}
        message="You are unauthorized to make that request."
      />
    );

  if (getOrCreateByEmailMutation.error)
    return (
      <ServerError
        code={500}
        message="Could not load user resource. Please try again."
      />
    );

  return (
    <Tabs defaultValue={stages[0]}>
      <h1 className="text-2xl font-bold">Pipeline</h1>
      <TabsList className="my-5 flex w-full">
        {stages.map((stage) => (
          <TabsTrigger
            key={stage}
            value={stage}
            className="flex flex-1 flex-col space-y-2"
          >
            <p className="font-light tracking-wider">{stage}</p>
          </TabsTrigger>
        ))}
      </TabsList>

      {stages.map((stage) => {
        const filteredProjects = projects?.filter(
          (project) => stage === "ALL" || project.stage === stage,
        );

        return (
          <TabsContent key={stage} value={stage} className="sm:min-h-96">
            {(!userFromDb || projectsQuery.isLoading) && (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}

            {userFromDb &&
              projectsQuery.isSuccess &&
              (!filteredProjects || filteredProjects.length === 0) && (
                <NoResults
                  src="/images/blank-canvas.svg"
                  alt="Standing at a blank canvas."
                  text="No projects found."
                  size={200}
                />
              )}
            {userFromDb &&
              projectsQuery.isSuccess &&
              filteredProjects &&
              filteredProjects.length > 0 && (
                <Table className="font-extralight">
                  <TableHeader className="font-semibold">
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow
                        key={project.id}
                        className="text-xs tracking-wider"
                      >
                        <TableCell>
                          <Link href={`/studio/project/${project.id}`}>
                            {project.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/studio/project/${project.id}`}>
                            {project.event?.date.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/studio/project/${project.id}`}>
                            {project.event?.location}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/studio/project/${project.id}`}>
                            {!messages && <Skeleton className="h-6 w-20" />}
                            {messages && (
                              <Badge>{`${messages.length} unread`}</Badge>
                            )}
                          </Link>
                        </TableCell>

                        <TableCell>
                          {project.updatedAt.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <EllipsisVerticalIcon className="h-4 w-4 cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuGroup>
                                <DropdownMenuItem>
                                  <ArrowRightLeftIcon className="mr-2 h-4 w-4" />
                                  <span>Move stage</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CalendarClockIcon className="mr-2 h-4 w-4" />
                                  <span>Reschedule</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500">
                                  <Trash2Icon className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
