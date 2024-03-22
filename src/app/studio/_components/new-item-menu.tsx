"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import { BriefcaseBusinessIcon, FolderPenIcon, PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const menuItems = [
  { icon: PersonIcon, label: "Lead" },
  { icon: BriefcaseBusinessIcon, label: "Project" },
  { label: "Collection", icon: FolderPenIcon },
];

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
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index} className="flex items-center space-x-2">
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default NewItemMenu;
