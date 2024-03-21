import Navigation from "~/app/_components/app-navigation";
import Footer from "~/components/global/footer";
import CTA from "./_components/cta";
import Features from "./_components/features";
import Hero from "./_components/hero";
import Pricing from "./_components/pricing";
import Testimonial from "./_components/testimonial";
import VisualFeatures from "./_components/visual-features";

export default async function Home() {
  return (
    <div className="h-full w-full">
      <Navigation />
      <Hero />
      {/* <HeroParallaxDemo /> */}
      <Pricing />
      <VisualFeatures />
      <Features />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  );
}
