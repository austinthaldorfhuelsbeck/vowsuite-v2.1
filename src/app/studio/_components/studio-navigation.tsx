"use client";

import { BellIcon, BugIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type PropsWithChildren } from "react";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { studioNavigation } from "~/lib/constants";
import UserMenu from "./user-menu";

function BugReport() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <BugIcon className="mx-3 my-auto h-5 w-5 cursor-pointer text-muted-foreground transition-all ease-in-out hover:text-card-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-muted-foreground">
            Found a bug? Let us know so we can fix it.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

type ListItemProps = {
  title: string;
  href: string;
};

function ListItem(props: PropsWithChildren<ListItemProps>) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{props.title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {props.children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function StudioNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <BugReport />
        <NavigationMenuItem>
          <NavigationMenuTrigger>Create</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-6 lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/studio/projects/new"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      New Project
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Start a new project from scratch. Projects can be new
                      leads, existing clients, or personal projects.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/studio/collections" title="Collections">
                Branded galleries of media, files, and links for your clients.
              </ListItem>
              <ListItem href="/studio/tasks" title="Tasks">
                Assign tasks to your team members or yourself.
              </ListItem>
              <ListItem href="/studio/invoices" title="Invoices">
                Create and manage invoices for your clients.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {studioNavigation.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/studio/pipeline" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Projects
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default function Navigation(props: {
  imageUrl: string;
  firstName: string;
  lastName: string;
}) {
  return (
    <header className="relative flex items-center justify-between px-5 py-3">
      <aside className="flex space-x-5">
        <Link href="/studio/studio" className="flex items-center gap-2">
          <Image
            src={"/assets/logo.svg"}
            alt="Vowsuite"
            width={24}
            height={24}
          />
          <span className="font-bold">Vowsuite</span>
        </Link>
        <Button
          variant="link"
          className="flex min-w-32 gap-2 rounded-3xl border py-1"
        >
          <SearchIcon className="my-auto h-5 w-5 text-muted-foreground" />
          <p className="my-auto text-sm text-muted-foreground">Search...</p>
        </Button>
      </aside>

      <div className="hidden md:inline-block">
        <StudioNavigationMenu />
      </div>

      <aside className="flex space-x-5">
        <BellIcon className="my-auto h-5 w-5 cursor-pointer text-muted-foreground transition-all ease-in-out hover:text-card-foreground" />
        <UserMenu {...props} />
      </aside>
    </header>
  );
}
