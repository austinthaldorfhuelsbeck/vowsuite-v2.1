"use client";

import { type Contact, type User } from "@prisma/client";
import { CirclePlusIcon, ImagesIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type ProjectWithData } from "~/types";
import { ProjectsSheet } from "./projects-sheet";
import ScheduleDialog from "./schedule-dialog";

export default function ProjectPageHeader(props: {
  project: ProjectWithData;
  participants: (User | Contact)[];
}) {
  const { project, participants } = props;
  return (
    <header className="space-y-5">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold leading-none md:text-3xl xl:text-5xl">
              {project.name}
            </CardTitle>
            <ProjectsSheet agencyId={project.agencyId} />
          </div>
        </CardHeader>

        {project.event && (
          <CardContent>
            <h2>
              {project.event.date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </h2>
            <h3 className="text-sm text-muted-foreground">
              {project.event.location}
            </h3>
          </CardContent>
        )}
      </Card>

      <section className="flex justify-between">
        <aside className="flex flex-col space-y-2">
          <p className="hidden text-xs text-muted-foreground md:inline-block">
            Visible to you + {participants.length - 1} participant
            {participants.length - 1 === 1 ? "" : "s"}
          </p>
          <div className="flex space-x-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex max-w-36 items-center space-x-2"
              >
                <Avatar>
                  <AvatarImage
                    src={participant.avatar ?? ""}
                    alt={`${participant.firstName} ${participant.lastName}`}
                  />
                  <AvatarFallback>
                    {participant.firstName[0]}
                    {participant.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="hidden text-xs sm:inline-block">
                  {participant.firstName} {participant.lastName}
                </p>
              </div>
            ))}
            <div className="flex cursor-pointer items-center space-x-2 transition-all ease-in-out hover:scale-95">
              <CirclePlusIcon size={28} className="text-muted-foreground" />
              <p className="text-xs">Add</p>
            </div>
          </div>
        </aside>

        <aside className="flex items-center space-x-3">
          <ScheduleDialog event={project.event ?? undefined} />
          <Button className="flex space-x-2">
            <ImagesIcon size={16} />
            <span>Collection</span>
          </Button>
        </aside>
      </section>
    </header>
  );
}
