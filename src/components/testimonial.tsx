import Image from "next/image";
import AnimateWrapper from "~/layouts/animate-wrapper";
import GradientWrapper from "~/layouts/gradient-wrapper";
import SectionWrapper from "~/layouts/section-wrapper";
import { testimonials } from "~/lib/constants";

const Testimonial = () => (
  <SectionWrapper id="testimonial">
    <div id="testimonials" className="custom-screen">
      <div className="max-w-2xl text-center md:mx-auto">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Trusted by that guy Nate
        </h2>
      </div>
      <GradientWrapper
        wrapperClassName="max-w-sm h-40 top-12 inset-x-0"
        className="mt-12"
      >
        <AnimateWrapper>
          <ul className="grid gap-6 delay-300 duration-1000 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, idx) => (
              <li
                key={idx}
                className="rounded-xl border p-4"
                style={{
                  backgroundImage:
                    "radial-gradient(100% 100% at 50% 50%, rgba(250, 154, 133, 0.05) 0%, rgba(124, 58, 237, 0) 100%)",
                }}
              >
                <figure className="flex h-full flex-col justify-between gap-y-6">
                  <blockquote className="">
                    <p className="">{item.quote}</p>
                  </blockquote>
                  <div className="flex items-center gap-x-4">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      className="h-14 w-14 rounded-full object-cover"
                      width={56}
                      height={56}
                    />
                    <div>
                      <span className="block font-semibold ">{item.name}</span>
                      <span className="mt-0.5 block text-sm">{item.title}</span>
                    </div>
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        </AnimateWrapper>
      </GradientWrapper>
    </div>
  </SectionWrapper>
);

export default Testimonial;
