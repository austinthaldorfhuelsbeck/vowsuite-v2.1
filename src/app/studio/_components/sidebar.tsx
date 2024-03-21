"use client";

import { type User } from "@prisma/client";
import { PersonIcon } from "@radix-ui/react-icons";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

type SidebarProps = {
  user?: User;
};

const Sidebar = ({ user }: SidebarProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => setIsShowing(!isShowing);

  const toggleButtonClasses =
    "my-auto h-5 w-5 inline-flex sm:hidden cursor-pointer";

  const sidebarContentClasses = `${isShowing ? "inline-flex" : "hidden sm:inline-flex"} w-full`;

  return (
    <aside className="mb-3 w-full rounded-lg border sm:mb-0 sm:mr-3 sm:h-full sm:min-h-96 sm:w-72">
      <nav className="flex flex-col space-y-4 p-4">
        <div className="flex space-x-2">
          <h1 className="text-lg font-bold">Clients</h1>
          {isShowing && (
            <MinusIcon className={toggleButtonClasses} onClick={toggle} />
          )}
          {!isShowing && (
            <PlusIcon className={toggleButtonClasses} onClick={toggle} />
          )}
        </div>

        <div className={sidebarContentClasses}>
          <Button disabled={user?.agencyId ? false : true} className="w-full">
            <div className="flex space-x-2">
              <PersonIcon className="my-auto h-5 w-5" />
              <span className="my-auto">New Client</span>
            </div>
          </Button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
