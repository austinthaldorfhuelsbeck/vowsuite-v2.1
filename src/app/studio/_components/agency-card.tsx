import { type Agency } from "@prisma/client";
import { ArrowUpRightFromSquareIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

const AgencyCard = (props: { agency: Partial<Agency> }) => {
  return (
    <Card
      style={{
        backgroundColor: props.agency?.colorBackground ?? "none",
        color: props.agency?.colorText ?? "none",
      }}
    >
      <CardHeader>
        <Image
          src={props.agency?.avatar ?? "/assets/user-placeholder.jpg"}
          alt={"Agency Image"}
          width={65}
          height={65}
          className="mx-auto rounded-full"
        />
        <h2
          className="text-center text-2xl font-bold"
          style={{
            fontFamily: props.agency?.fontPrimary ?? "none",
          }}
        >
          {props.agency?.name}
        </h2>
      </CardHeader>
      <CardContent
        className="flex flex-col"
        style={{
          fontFamily: props.agency?.fontSecondary ?? "none",
        }}
      >
        <Separator
          style={{ backgroundColor: props.agency?.colorAccent ?? "none" }}
        />
        <Button
          variant="ghost"
          className="mx-auto my-5 hover:bg-black/10 hover:text-inherit"
        >
          <div className="flex space-x-2">
            <ArrowUpRightFromSquareIcon
              width={14}
              height={14}
              className="my-auto"
            />
            <Link href={props.agency?.website ?? "#"}>
              <p className="text-sm">Visit Website</p>
            </Link>
          </div>
        </Button>
        <Separator
          style={{ backgroundColor: props.agency?.colorAccent ?? "none" }}
        />
        <p className="my-4 text-center text-sm">Follow us</p>
        <div className="flex justify-center space-x-4">
          <Link href={props.agency?.facebook ?? "#"}>
            <Image
              src="/social/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
            />
          </Link>
          <Link href={props.agency?.instagram ?? "#"}>
            <Image
              src="/social/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
            />
          </Link>
          <Link href={props.agency?.twitter ?? "#"}>
            <Image src="/social/x.svg" alt="Twitter" width={24} height={24} />
          </Link>
          <Link href={props.agency?.youtube ?? "#"}>
            <Image
              src="/social/youtube.svg"
              alt="Youtube"
              width={24}
              height={24}
            />
          </Link>
          <Link href={props.agency?.tiktok ?? "#"}>
            <Image
              src="/social/tiktok.svg"
              alt="TikTok"
              width={24}
              height={24}
            />
          </Link>
          {/* <Link href={props.agency?.vimeo ?? "#"}>
            <Image src="/social/vimeo.svg" alt="Vimeo" width={24} height={24} />
          </Link> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgencyCard;
