import "@/styles/globals.css";

import { Raleway } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";

import Footer from "@/components/layout/footer";
import WalletProvider from "providers/WalletProvider";
import { Toaster } from "@/components/ui/sonner";

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
        <WalletProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <main
              className={`min-h-[calc(100svh-${NAVBAR_HEIGHT_SM})] overflow-x-hidden t-[${NAVBAR_HEIGHT_SM}] md:min-h-[calc(100svh-${NAVBAR_HEIGHT_MD})] t-[${NAVBAR_HEIGHT_MD}]`}
            >
              {children}
            </main>
            <Footer />
            <Toaster richColors />
          </TRPCReactProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
