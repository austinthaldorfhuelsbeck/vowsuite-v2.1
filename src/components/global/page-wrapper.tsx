import { type PropsWithChildren } from "react";
import Footer from "./footer";
import Navigation from "./navigation";

const PageWrapper = (props: PropsWithChildren) => {
  return (
    <div className="h-full w-full">
      <Navigation />
      {props.children}
      <Footer />
    </div>
  );
};

export default PageWrapper;
