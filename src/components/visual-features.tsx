import Image from "next/image";
import SectionWrapper from "~/layouts/section-wrapper";
import { visualFeaturesList } from "~/lib/constants";

const VisualFeatures = () => {
  return (
    <SectionWrapper id="features">
      <div className="custom-screen">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Take your event videography to the next level with Vowsuite
          </h2>
          <p className="mt-3">
            With Vowsuite&apos;s intuitive features, you can effortlessly curate
            and share stunning video galleries that captivate your clients.
          </p>
        </div>
        <div className="mt-12">
          <ul className="gap-x-6 space-y-8 sm:flex sm:space-y-0">
            {visualFeaturesList.map((item, idx) => (
              <li
                className="flex flex-1 flex-col justify-between rounded-2xl border"
                key={idx}
                style={{
                  background:
                    "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)",
                }}
              >
                <div className="p-8">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 sm:text-sm md:text-base">{item.desc}</p>
                </div>
                <div className="pl-8">
                  <Image
                    src={item.img}
                    className="ml-auto w-full"
                    alt={item.title}
                    width={500}
                    height={500}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default VisualFeatures;
