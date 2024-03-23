import { type Agency } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import greeting from "~/utils/greeting";

export default function DashboardHeader(props: {
  firstName: string | null;
  agency?: Agency;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex space-x-5">
        <Image
          src="/images/happy-birthday.svg"
          width={75}
          height={75}
          alt="A gift wrapped with a bow and confetti"
        />
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <h1 className="text-2xl font-bold">{greeting(props.firstName)}</h1>
          <p className="text-sm text-muted-foreground">
            Thank you for being a part of the Vowsuite beta testing team.
          </p>
        </div>
      </div>
      {props.agency && (
        <Link href="/studio/settings/agency">
          <div className="flex flex-col space-y-2">
            <Image
              src={props.agency.avatar}
              width={50}
              height={50}
              alt="Agency logo"
              className="mx-auto rounded-full"
            />
            <p className="text-sm text-muted-foreground">{props.agency.name}</p>
          </div>
        </Link>
      )}
    </div>
  );
}
