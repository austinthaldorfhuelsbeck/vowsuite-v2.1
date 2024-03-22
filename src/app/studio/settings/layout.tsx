export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="">{children}</div>
    </>
  );
}
