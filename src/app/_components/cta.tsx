import Link from "next/link";
import { type FC } from "react";
import { Button } from "~/components/ui/button";
import AnimateWrapper from "~/layouts/animate-wrapper";
import GradientWrapper from "~/layouts/gradient-wrapper";

const CTA: FC = () => (
  <section>
    <GradientWrapper wrapperClasses="max-w-xs h-[13rem] top-12 inset-0">
      <div className="custom-screen relative py-28">
        <AnimateWrapper>
          <div className="relative z-10">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Transform Your Event Sharing Today
              </h2>
              <p className="mt-5 p-1 sm:p-0">
                With Vowsuite, effortlessly craft and share captivating, branded
                video galleries tailored to every audience. Begin creating
                lasting impressions now.
              </p>
            </div>
            <div className="mt-5 flex justify-center text-sm font-medium">
              <Link href="/studio">
                <Button variant="secondary">Start free trial →</Button>
              </Link>
            </div>
          </div>
        </AnimateWrapper>
      </div>
    </GradientWrapper>
  </section>
);

export default CTA;
