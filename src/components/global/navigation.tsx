import { type User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "~/lib/constants";
import UserMenu from "../../app/_components/user-menu";
import { Button } from "../ui/button";

const Navigation = (props: { user?: Partial<User> }) => {
  return (
    <header className="relative flex items-center justify-between p-4">
      <aside className="px-5">
        <Link
          href={props.user ? "/studio" : "/"}
          className="flex items-center gap-2"
        >
          <Image
            src={"./assets/logo.svg"}
            alt="Vowsuite"
            width={24}
            height={24}
          />
          <span className="font-bold">Vowsuite</span>
        </Link>
      </aside>

      {!props.user && (
        <nav className="absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] transform md:block">
          <ul className="flex items-center justify-center">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <Button variant="ghost">{item.title}</Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <aside className="flex gap-2">
        {props.user && <UserMenu user={props.user} />}
        {!props.user && (
          <>
            <Link href="/studio">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Button variant="secondary">Start free trial →</Button>
          </>
        )}
      </aside>
    </header>
  );
};

export default Navigation;
