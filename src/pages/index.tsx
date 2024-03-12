import type { NextPage } from "next";
import CTA from "~/components/cta";
import Features from "~/components/features";
import Navigation from "~/components/global/navigation";
import Hero from "~/components/hero";
import { HeroParallaxDemo } from "~/components/hero-parallax";
import Pricing from "~/components/pricing";
import Testimonial from "~/components/testimonial";
import VisualFeatures from "~/components/visual-features";
import PageWrapper from "~/layouts/page-wrapper";

const Home: NextPage = () => {
  return (
    <PageWrapper>
      <Navigation />
      <Hero />
      <HeroParallaxDemo />
      <Pricing />
      <VisualFeatures />
      <Features />
      <Testimonial />
      <CTA />
    </PageWrapper>
  );
};

export default Home;
