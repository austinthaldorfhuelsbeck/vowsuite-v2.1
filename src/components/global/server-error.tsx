import Image from "next/image";
import Link from "next/link";

const ServerError = (props: { code: number; message: string }) => {
  return (
    <section className="absolute right-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-background">
      <div className="mx-auto flex max-w-screen-sm flex-col text-center">
        <h1 className="mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-8xl font-extrabold tracking-tight text-transparent lg:text-9xl">
          {props.code}
        </h1>
        <p className="mb-4 text-xl font-bold tracking-tight md:text-4xl">
          {props.message}
        </p>
        <Link href="/">
          <div className="mx-auto tracking-wide duration-300 hover:underline">
            <p>Go back home</p>
          </div>
        </Link>
        <Image
          src="/images/by-the-road.svg"
          alt="Illustration of a person standing by the road."
          width={400}
          height={300}
          className="mx-auto my-5 rounded-lg"
        />
      </div>
    </section>
  );
};

export default ServerError;
