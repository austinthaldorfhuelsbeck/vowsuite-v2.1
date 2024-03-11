import { type PropsWithChildren } from "react";

type Props = {
  id?: string;
};
const SectionWrapper = (props: PropsWithChildren<Props>) => (
  <section id={props.id} className="my-24 p-10 sm:my-10">
    {props.children}
  </section>
);

export default SectionWrapper;
