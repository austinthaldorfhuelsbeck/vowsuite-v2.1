import type { PropsWithChildren } from "react";

type Props = {
  className?: string;
  wrapperClassName?: string;
};
const GradientWrapper = (props: PropsWithChildren<Props>) => (
  <div {...props} className={`relative ${props.className ?? ""}`}>
    <div
      className={`absolute m-auto blur-[160px] ${props.wrapperClassName ?? ""}`}
      style={{
        background:
          "linear-gradient(180deg, #FFBE98 0%, rgba(255, 190, 152, 0.684375) 0.01%, rgba(255, 190, 152, 0.2) 100%)",
      }}
    ></div>
    <div className="relative">{props.children}</div>
  </div>
);

export default GradientWrapper;
