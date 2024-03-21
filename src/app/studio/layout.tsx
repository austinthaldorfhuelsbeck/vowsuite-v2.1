import Navigation from "./_components/studio-navigation";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="mx-auto my-3 flex max-w-4xl flex-col space-y-3 px-5">
        {children}
      </div>
    </>
  );
}
