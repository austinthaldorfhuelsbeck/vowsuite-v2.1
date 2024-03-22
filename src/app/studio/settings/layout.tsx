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
    <>
      <h1 className="text-2xl font-bold">Settings</h1>
      <Tabs defaultValue={activeTab} className="sm:w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
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
        </TabsList>
      </Tabs>
      <div className="">{children}</div>
    </>
  );
}
