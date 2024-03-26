import { CheckIcon } from "lucide-react";
import AnimateWrapper from "~/layouts/animate-wrapper";
import SectionWrapper from "~/layouts/section-wrapper";
import { pricingPlans } from "~/lib/constants";

const mostPopPricingBg =
  "radial-gradient(130.39% 130.39% at 51.31% -0.71%, #8d99ab53 0%, rgba(31, 41, 55, 0) 100%)";

const Pricing = () => (
  <SectionWrapper id="pricing">
    <div className="relative mx-auto max-w-xl text-center">
      <h2 className="text-3xl font-semibold sm:text-4xl">
        Find a plan to power your business
      </h2>
    </div>

    <AnimateWrapper>
      <div className="my-10 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
        {pricingPlans.map((item, idx) => (
          <div
            key={idx}
            className={`relative mt-6 flex flex-1 flex-col items-stretch rounded-xl border sm:mt-0 ${item.isMostPop ? "border border-primary" : ""}`}
            style={{
              backgroundImage: item.isMostPop ? mostPopPricingBg : "",
            }}
          >
            <div className="space-y-4 border-b p-8 text-center">
              <span className="font-medium text-primary">{item.name}</span>
              <div className="text-3xl font-semibold">
                ${item.price}{" "}
                <span className="text-xl font-normal text-stone-600 dark:text-stone-400">
                  /mo
                </span>
              </div>
              <p className="text-stone-800 dark:text-stone-400">{item.desc}</p>
            </div>
            <div className="p-8">
              <ul className="space-y-3">
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <CheckIcon width={18} className="text-primary" />
                    {featureItem}
                  </li>
                ))}
              </ul>
              <div className="pt-8">
                <button
                  className={`w-full rounded-full px-4 py-2.5 text-center text-sm font-medium ring-offset-2 duration-150 focus:ring ${item.isMostPop ? "bg-primary text-stone-800 ring-primary hover:bg-accent focus:bg-accent" : "bg-stone-800 text-stone-200 ring-stone-800 hover:bg-stone-700"}`}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimateWrapper>
  </SectionWrapper>
);

export default Pricing;
