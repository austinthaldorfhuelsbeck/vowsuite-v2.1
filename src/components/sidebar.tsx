"use client";

import { FolderPlusIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Sidebar = () => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => setIsShowing(!isShowing);

  const toggleButtonClasses =
    "my-auto h-5 w-5 inline-flex sm:hidden cursor-pointer";
  
  const sidebarContentClasses = `${isShowing ? "inline-flex" : "hidden sm:inline-flex"} w-full`;

  return (
    <aside className="w-full rounded-lg border sm:mr-3 sm:h-full sm:min-h-96 sm:w-72">
      <nav className="flex flex-col space-y-4 p-4">
        <div className="flex space-x-2">
          <h1 className="text-xl font-bold">Galleries</h1>
          {isShowing && (
            <MinusIcon className={toggleButtonClasses} onClick={toggle} />
          )}
          {!isShowing && (
            <PlusIcon className={toggleButtonClasses} onClick={toggle} />
          )}
        </div>

        <div className={sidebarContentClasses}>
          <Button disabled className="w-full">
            <div className="flex space-x-2">
              <FolderPlusIcon className="my-auto h-5 w-5" />
              <span className="my-auto">New Gallery</span>
            </div>
          </Button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
