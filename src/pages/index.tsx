import type { NextPage } from "next";
import CTA from "~/components/CTA";
import Features from "~/components/Features";
import Hero from "~/components/Hero";
import Pricing from "~/components/Pricing";
import Testimonial from "~/components/Testimonial";
import VisualFeatures from "~/components/visual-features";
import PageWrapper from "~/layouts/page-wrapper";

const Home: NextPage = () => {
  return (
    <PageWrapper>
      <Hero />
      <VisualFeatures />
      <Features />
      <Pricing />
      <Testimonial />
      <CTA />
    </PageWrapper>
  );
};

export default Home;
