"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
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

type UserMenuProps = {
  avatar?: string;
  firstName?: string;
  lastName?: string;
};

const UserAvatar = (props: UserMenuProps) => {
  return (
    <Avatar>
      <AvatarImage src={props.avatar ?? undefined} alt="Profile Image" />
      <AvatarFallback>
        {`${props.firstName?.[0] ?? ""}${props.lastName?.[0] ?? ""}`.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

const UserMenu = (props: UserMenuProps) => {
  // const { signOut } = useClerk();
  // const router = useRouter();
  // const onLogout = () => signOut(() => router.push("/"));

  return (
    <div className="ml-auto text-right">
      <DropdownMenu>
        <div>
          <DropdownMenuTrigger>
            <UserAvatar {...props} />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="mr-5 w-56">
          <DropdownMenuLabel className="font-bold">
            {props.avatar && (
              <div className="flex space-x-3">
                {props.avatar && <UserAvatar {...props} />}
                <span>
                  {`${props.firstName} ${props.lastName}` ?? "Vowsuite User"}
                </span>
              </div>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/studio/profile-settings">Profile Settings</Link>
            </DropdownMenuItem>
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
