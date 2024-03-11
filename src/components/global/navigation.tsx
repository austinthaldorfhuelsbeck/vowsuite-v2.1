import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "~/lib/constants";

const LoginButton = () => (
  <Link
    href="/studio"
    className="hover:bg-primary/10 hover:text-primary my-auto rounded px-2 py-1 text-sm font-semibold transition-all"
  >
    Log in
  </Link>
);

const Navigation = () => {
  const { isSignedIn, isLoaded } = useUser();
  return (
    <header className="relative flex items-center justify-between p-4">
      <aside className="px-5">
        <Link
          href={isLoaded && isSignedIn ? "/studio" : "/"}
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

      {isLoaded && !isSignedIn && (
        <nav className="absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] transform md:block">
          <ul className="flex items-center justify-center gap-6">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="hover:bg-primary/10 hover:text-primary rounded px-2 py-1 text-sm font-light transition-all"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <aside className="flex gap-2">
        {isSignedIn && <UserButton />}{" "}
        {isLoaded && !isSignedIn && (
          <>
            <LoginButton />
            {/* <FreeTrialButton /> */}
          </>
        )}
      </aside>
    </header>
  );
};

export default Navigation;
