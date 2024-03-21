"use client";

import { SignOutButton } from "@clerk/nextjs";
import { type User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
} from "~/components/ui/dropdown-menu";

const UserAvatar = (props: { user?: Partial<User> }) => {
  return (
    <Avatar>
      <AvatarImage src={props.user?.avatar ?? undefined} alt="Profile Image" />
      <AvatarFallback>
        {`${props.user?.firstName?.[0] ?? ""}${props.user?.lastName?.[0] ?? ""}`.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

const UserMenu = (props: { user?: Partial<User> }) => {
  // const { signOut } = useClerk();
  // const router = useRouter();
  // const onLogout = () => signOut(() => router.push("/"));

  return (
    <div className="ml-auto text-right">
      <DropdownMenu>
        <div>
          <DropdownMenuTrigger>
            <UserAvatar user={props.user} />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="mr-5 w-56">
          <DropdownMenuLabel className="font-bold">
            {props.user && (
              <div className="flex space-x-3">
                {props.user?.avatar && <UserAvatar user={props.user} />}
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
          <DropdownMenuItem>
            <SignOutButton>Log out</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
