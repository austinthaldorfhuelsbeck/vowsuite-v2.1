import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Head from "next/head";
import { cn } from "~/lib/utils";
import ThemeProvider from "~/providers/theme-provider";
import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={cn("font-sans", inter.variable)}>
      <ClerkProvider {...pageProps} appearance={{ baseTheme: dark }}>
        <Head>
          <title>Vowsuite - Capture, curate, celebrate.</title>
          <meta
            name="description"
            content="Vowsuite is the seamless video gallery platform where every event is transformed into a shared, unforgettable journey."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </ClerkProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
