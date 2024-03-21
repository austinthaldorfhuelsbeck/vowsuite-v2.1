import Footer from "~/components/global/footer";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      {children}
      <Footer />
    </div>
  );
}
