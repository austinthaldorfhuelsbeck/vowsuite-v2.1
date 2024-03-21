import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { navigation } from "~/lib/constants";

const Navigation = async () => (
  <header className="relative flex items-center justify-between px-5 py-3">
    <aside>
      <Link href="/" className="flex items-center gap-2">
        <Image src={"/assets/logo.svg"} alt="Vowsuite" width={24} height={24} />
        <span className="font-bold">Vowsuite</span>
      </Link>
    </aside>

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

    <aside className="flex space-x-2">
      <Link href="/sign-in">
        <Button variant="ghost">Log in</Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="secondary">Start free trial →</Button>
      </Link>
    </aside>
  </header>
);

export default Navigation;
