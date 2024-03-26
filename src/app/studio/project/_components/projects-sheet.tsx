"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export function ProjectsSheet(props: { agencyId: string }) {
  const projectsQuery = api.projects.getByAgencyId.useQuery({
    agencyId: props.agencyId,
  });
  const projects = projectsQuery.data;

  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const toggleSortDirection = () =>
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");

  useEffect(() => {
    if (projects) {
      setFilteredProjects(
        projects.slice().sort((a, b) => {
          if (sortDirection === "desc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        }),
      );
    }
  }, [projects, sortDirection]);

  useEffect(() => {
    if (projects) {
      setFilteredProjects(
        projects.filter((project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }
  }, [projects, searchQuery]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">All Projects</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex-row items-center gap-3">
          <SheetTitle className="text-xl font-bold ">All Projects</SheetTitle>
          <SheetDescription>
            <Button
              variant="ghost"
              onClick={toggleSortDirection}
              className="p-2"
            >
              <>
                <p className="text-xs font-extralight capitalize">
                  {sortDirection}
                </p>
                {
                  {
                    asc: <ChevronUpIcon size={20} />,
                    desc: <ChevronDownIcon size={20} />,
                  }[sortDirection]
                }
              </>
            </Button>
          </SheetDescription>
        </SheetHeader>

        <div className="my-3 space-y-3">
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {projectsQuery.isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10" />
            ))}
          {filteredProjects?.map((project) => (
            <Button key={project.id} variant="link" className="w-full p-0">
              <Link href={`/studio/project/${project.id}`} className="mr-auto">
                {project.name}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
