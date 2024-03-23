import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function DashboardLinksCard(props: {
  title: string;
  links: { title: string; href: string; icon: LucideIcon }[];
}) {
  return (
    <Card className="rounded-sm shadow">
      <CardHeader className="px-3 pb-0 pt-2 xl:hidden">
        <h2 className="text-lg font-bold">{props.title}</h2>
      </CardHeader>
      <CardContent className="grid h-full grid-cols-2 gap-3 p-3">
        {props.links.map((link, idx) => (
          <Link key={idx} href={link.href}>
            <Card className="flex min-h-20 cursor-pointer flex-col items-center justify-center gap-1 text-sm transition-all ease-in-out hover:bg-muted">
              <link.icon className="h-4 w-4 text-primary" />
              <span>{link.title}</span>
            </Card>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
