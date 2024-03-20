import Image from "next/image";
import { Button } from "~/components/ui/button";
import AnimateWrapper from "~/layouts/animate-wrapper";
import GradientWrapper from "~/layouts/gradient-wrapper";


const Hero = () => (
  <section>
    <div className="mx-auto max-w-screen-xl gap-12 overflow-hidden px-4 pt-24 md:flex md:px-8">
      <AnimateWrapper>
        <div className="max-w-2xl flex-none space-y-5">
          <Button
            variant={"secondary"}
            // href="javascript:void(0)"
            // className="inline-flex items-center gap-x-6 rounded-full border border-primary p-1 pr-6 text-sm font-medium duration-150 hover:bg-primary/20 hover:text-primary"
          >
            <span className="inline-block rounded-full bg-[var(--peach-fuzz)] px-3 py-1">
              News
            </span>
            <p className="flex items-center">
              Read the launch post
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          </Button>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Capture, curate, celebrate. <br /> Your events, elevated.
          </h1>
          <h1 className="text-4xl font-extrabold sm:text-5xl"></h1>
          <p>
            Vowsuite is the seamless video gallery platform where every event is
            transformed into a shared, unforgettable journey.
          </p>
        </div>
      </AnimateWrapper>

      <div className="hidden flex-1 md:block">
        <Image
          src="/images/camera.svg"
          className="max-w-xl"
          width={500}
          height={500}
          alt="Float UI"
        />
      </div>
    </div>
    <GradientWrapper
      className="mt-10 p-10"
      wrapperClassName="max-w-3xl h-[250px] top-12 inset-0 sm:h-[300px] lg:h-[650px]"
    >
      <div className="align-center flex flex-col items-center space-y-3">
        <Button variant="secondary" className="mx-auto">
          Start free trial →
        </Button>
        <span className="text-sm font-extralight">No credit card required</span>
      </div>
    </GradientWrapper>
  </section>
);

export default Hero;
