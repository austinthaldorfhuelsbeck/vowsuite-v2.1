"use client";

import { useInView } from "framer-motion";
import { useRef, type PropsWithChildren } from "react";

const AnimateWrapper = (props: PropsWithChildren) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <span
        className={`${isInView ? "opacity-1" : "opacity-0"} delay-300 duration-1000`}
      >
        {props.children}
      </span>
    </div>
  );
};

export default AnimateWrapper;
