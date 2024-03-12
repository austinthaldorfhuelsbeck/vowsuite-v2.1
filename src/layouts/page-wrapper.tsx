import { type PropsWithChildren } from "react";
import Footer from "../components/global/footer";
import Navigation from "../components/global/navigation";

const PageWrapper = (props: PropsWithChildren) => {
  return (
    <div className="h-screen w-full">
      <Navigation />
      {props.children}
      <Footer />
    </div>
  );
};

export default PageWrapper;
