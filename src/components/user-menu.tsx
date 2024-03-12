import { useClerk } from "@clerk/nextjs";

import { type User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserMenu = (props: { user?: Partial<User> }) => {
  const { signOut } = useClerk();
  const router = useRouter();
  const onLogout = () => signOut(() => router.push("/"));

  return (
    <div className="ml-auto text-right">
      <DropdownMenu>
        <div>
          <DropdownMenuTrigger>
            <Image
              src={props.user?.avatar ?? "/assets/user-placeholder.jpg"}
              alt={"Profile Image"}
              width={32}
              height={32}
              className="rounded-full"
            />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="mr-5 w-56">
          <DropdownMenuLabel className="font-bold">
            {props.user && (
              <div className="flex space-x-3">
                {props.user?.avatar && (
                  <Image
                    src={props.user.avatar}
                    alt={"Profile Image"}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                )}
                <span>
                  {`${props.user?.firstName} ${props.user?.lastName}` ??
                    "Vowsuite User"}
                </span>
              </div>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Agency Settings</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
