import Navigation from "./_components/studio-navigation";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="mx-auto my-5 max-w-4xl px-5 xl:max-w-7xl">{children}</div>
    </>
  );
}
