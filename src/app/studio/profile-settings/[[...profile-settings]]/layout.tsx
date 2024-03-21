export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="my-5 flex w-full justify-center">{children}</div>;
}
