import AnimateWrapper from "~/layouts/animate-wrapper";
import SectionWrapper from "~/layouts/section-wrapper";
import { featuresList } from "~/lib/constants";

const Features = () => (
  <SectionWrapper>
    <div id="features" className="custom-screen">
      <AnimateWrapper>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Start enhancing your event videography with Vowsuite.
          </h2>
          <p className="mt-3">
            Vowsuite simplifies creating and sharing professional video
            galleries that capture attention, enabling you to monitor
            engagement, and foster client relationships.
          </p>
        </div>
      </AnimateWrapper>
      <AnimateWrapper>
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuresList.map((item, idx) => (
              <li key={idx} className="space-y-3 rounded-xl border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnimateWrapper>
    </div>
  </SectionWrapper>
);

export default Features;
