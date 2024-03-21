"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import { BriefcaseBusinessIcon, PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const NewItemMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="default" className="flex space-x-1">
        <PlusIcon className="h-5 w-5" />
        <span>New</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mr-5 w-56">
      <DropdownMenuGroup>
        <DropdownMenuItem className="flex space-x-3">
          <BriefcaseBusinessIcon className="h-5 w-5" />
          <span>Project</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex space-x-3">
          <PersonIcon className="h-5 w-5" />
          <span>Client</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default NewItemMenu;
