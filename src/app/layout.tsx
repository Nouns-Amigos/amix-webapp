import "@/styles/globals.css";

import { Raleway } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";

import Navbar from "@/components/layout/navbar";

export const metadata = {
  title: "Nouns Amigos",
  description: "Somos la comunidad de Nouns en español",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const bodyFont = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
});

const NAVBAR_HEIGHT = "64px"; // ~4rem or h-16 (tailwind)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${bodyFont.variable} h-screen`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Navbar />
          <main
            className={`min-h-[calc(100svh-${NAVBAR_HEIGHT})] overflow-x-hidden overflow-y-scroll`}
          >
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
