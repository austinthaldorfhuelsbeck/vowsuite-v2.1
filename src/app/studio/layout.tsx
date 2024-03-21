import Footer from "~/components/global/footer";
import Navigation from "~/components/global/navigation";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <Navigation />
      <div className="mb-3 flex flex-col p-3 sm:flex-row">{children}</div>
      <Footer />
    </div>
  );
}
