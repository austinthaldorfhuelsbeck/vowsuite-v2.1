import Navigation from "~/components/global/navigation";
import PageWrapper from "~/layouts/page-wrapper";
import CTA from "./_components/cta";
import Features from "./_components/features";
import Hero from "./_components/hero";
import Pricing from "./_components/pricing";
import Testimonial from "./_components/testimonial";
import VisualFeatures from "./_components/visual-features";

export default async function Home() {
  return (
    <PageWrapper>
      <Navigation />
      <Hero />
      {/* <HeroParallaxDemo /> */}
      <Pricing />
      <VisualFeatures />
      <Features />
      <Testimonial />
      <CTA />
    </PageWrapper>
  );
}
