import { type PropsWithChildren } from "react";
import Footer from "~/components/global/footer";

const PageWrapper = (props: PropsWithChildren) => {
  return (
    <div className="h-full w-full">
      {props.children}
      <Footer />
    </div>
  );
};

export default PageWrapper;
