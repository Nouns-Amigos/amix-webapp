import "@/styles/globals.css";

import { Raleway } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Nouns Amigos",
  description: "Somos la comunidad de Nouns en español",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const bodyFont = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
});

const NAVBAR_HEIGHT_SM = "0"; // ~5rem or h-20 (tailwind)
const NAVBAR_HEIGHT_MD = "0"; // ~6rem or h-24 (tailwind)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${bodyFont.variable} h-screen`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          {/* <Navbar /> */}
          <main
            className={`min-h-[calc(100svh-${NAVBAR_HEIGHT_SM})] overflow-x-hidden t-[${NAVBAR_HEIGHT_SM}] md:min-h-[calc(100svh-${NAVBAR_HEIGHT_MD})] t-[${NAVBAR_HEIGHT_MD}]`}
          >
            {children}
          </main>
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
