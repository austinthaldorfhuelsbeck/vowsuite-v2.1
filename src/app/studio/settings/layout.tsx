"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = pathname.split("/").pop();
  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Tabs defaultValue={activeTab} className="sm:w-[600px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="px-0">
            <Link href="/studio/settings/profile" className="w-full">
              Profile
            </Link>
          </TabsTrigger>
          <TabsTrigger value="agency" className="px-0">
            <Link href="/studio/settings/agency" className="w-full">
              Agency
            </Link>
          </TabsTrigger>
          <TabsTrigger value="team" className="px-0">
            <Link href="/studio/settings/team" className="w-full">
              Team
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {children}
    </div>
  );
}
