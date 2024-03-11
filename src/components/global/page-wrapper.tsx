import { useUser } from "@clerk/nextjs";
import { type PropsWithChildren } from "react";
import Footer from "./footer";
import Navigation from "./navigation";

const PageWrapper = (props: PropsWithChildren) => {
  const { isSignedIn } = useUser();

  return (
    <div className="h-full w-full">
      <Navigation isSignedIn={isSignedIn} />
      {props.children}
      <Footer />
    </div>
  );
};

export default PageWrapper;
