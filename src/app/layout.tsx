import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import { cn } from "~/lib/utils";

import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "~/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Vowsuite - Capture, curate, celebrate.",
  description:
    "Vowsuite is the seamless video gallery platform where every event is transformed into a shared, unforgettable journey.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("font-sans", inter.variable)}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
