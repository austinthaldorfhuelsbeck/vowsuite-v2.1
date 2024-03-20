"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import AnimateWrapper from "~/layouts/animate-wrapper";
import { cn } from "~/lib/utils";

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: (Tab | undefined)[];
  active?: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab?: Tab) => {
    return tab?.value === tabs[0]?.value;
  };
  return (
    <div className="relative h-full w-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab?.value}
          layoutId={tab?.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("absolute left-0 top-0 h-full w-full", className)}
        >
          {tab?.content}
        </motion.div>
      ))}
    </div>
  );
};

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: (Tab | undefined)[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab | undefined>(propTabs[0]);
  const [tabs, setTabs] = useState<(Tab | undefined)[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "no-visible-scrollbar relative mx-auto flex w-full max-w-full flex-row items-center justify-center overflow-auto [perspective:1000px] sm:overflow-visible",
          containerClassName,
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab?.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative rounded-full px-4 py-2", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active?.value === tab?.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 rounded-full border border-primary",
                  activeTabClassName,
                )}
              />
            )}

            <span className="relative block">{tab?.title}</span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active?.value}
        hovering={hovering}
        className={cn("mt-32", contentClassName)}
      />
    </>
  );
};

export function TabsDemo() {
  const tabs = [
    {
      title: "Celebrating",
      value: "celebrating",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-10 text-xl font-bold md:text-4xl">
          <AnimateWrapper>
            <p>Celebrating</p>
            <Image
              src="/images/celebrating.svg"
              alt="dummy image"
              width="1000"
              height="1000"
              className="absolute inset-x-0 -bottom-10  mx-auto h-[60%] w-[90%] rounded-xl object-cover object-left-top p-10 md:h-[90%]"
            />
          </AnimateWrapper>
        </div>
      ),
    },
    {
      title: "Festivities",
      value: "festivities",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-10 text-xl font-bold md:text-4xl">
          <AnimateWrapper>
            <p>Festivities</p>
            <Image
              src="/images/festivities.svg"
              alt="dummy image"
              width="1000"
              height="1000"
              className="absolute inset-x-0 -bottom-10  mx-auto h-[60%] w-[90%] rounded-xl object-cover object-left-top p-10 md:h-[90%]"
            />
          </AnimateWrapper>
        </div>
      ),
    },
    {
      title: "Wedding",
      value: "wedding",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-10 text-xl font-bold md:text-4xl">
          <AnimateWrapper>
            <p>Wedding</p>
            <Image
              src="/images/wedding.svg"
              alt="dummy image"
              width="1000"
              height="1000"
              className="absolute inset-x-0 -bottom-10  mx-auto h-[60%] w-[90%] rounded-xl object-cover object-left-top p-10 md:h-[90%]"
            />
          </AnimateWrapper>
        </div>
      ),
    },
  ];

  return (
    <div className="b relative mx-auto my-40 flex h-[20rem] max-w-2xl flex-col items-start  justify-start [perspective:1000px] md:h-[40rem]">
      <Tabs tabs={tabs} />
    </div>
  );
}
