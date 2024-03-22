import { SignOutButton } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/server";
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

const UserAvatar = (props: Partial<User>) => {
  return (
    <Avatar>
      <AvatarImage src={props.imageUrl ?? undefined} alt="Profile Image" />
      <AvatarFallback>
        {`${props.firstName?.[0] ?? ""}${props.lastName?.[0] ?? ""}`.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

const UserMenu = (props: { user: Partial<User> }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <UserAvatar {...props.user} />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mr-5 w-56">
      <DropdownMenuLabel className="font-bold">
        {props.user.imageUrl && (
          <div className="flex space-x-3">
            {props.user.imageUrl && <UserAvatar {...props.user} />}
            <span>
              {`${props.user.firstName} ${props.user.lastName}` ??
                "Vowsuite User"}
            </span>
          </div>
        )}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Link href="/studio/settings/profile">Profile Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/studio/settings/agency">Agency Settings</Link>
        </DropdownMenuItem>
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
);

export default UserMenu;
