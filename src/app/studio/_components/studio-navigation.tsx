import { currentUser } from "@clerk/nextjs";
import { BellIcon, BugIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import UserMenu from "./user-menu";

function BugReport() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <BugIcon className="my-auto h-5 w-5 cursor-pointer text-muted-foreground transition-all ease-in-out hover:text-card-foreground" />
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

export default async function Navigation() {
  const user = await currentUser();
  return (
    <header className="relative flex items-center justify-between px-5 py-3">
      <aside className="flex space-x-5">
        <Link href="/studio" className="flex items-center gap-2">
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

      {user && (
        <aside className="flex space-x-5">
          <BugReport />
          {/* <NewItemMenu /> */}
          <BellIcon className="my-auto h-5 w-5 cursor-pointer text-muted-foreground transition-all ease-in-out hover:text-card-foreground" />
          <UserMenu user={user} />
        </aside>
      )}
    </header>
  );
};
