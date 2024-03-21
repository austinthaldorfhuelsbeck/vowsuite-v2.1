import { type User } from "@clerk/nextjs/server";
import { BellIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./user-menu";

const Navigation = (props: { user: User }) => (
  <header className="relative flex items-center justify-between px-5 py-3">
    <aside>
      <Link href="/studio" className="flex items-center gap-2">
        <Image src={"/assets/logo.svg"} alt="Vowsuite" width={24} height={24} />
        <span className="font-bold">Vowsuite</span>
      </Link>
    </aside>

    <aside className="flex space-x-5">
      {/* <NewItemMenu /> */}
      <BellIcon className="my-auto h-6 w-6 cursor-pointer text-muted-foreground transition-all ease-in-out hover:text-card-foreground" />
      <UserMenu user={props.user} />
    </aside>
  </header>
);

export default Navigation;
