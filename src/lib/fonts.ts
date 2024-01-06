import { Inter, Londrina_Solid as LondrinaSolid } from "next/font/google";

export const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const nounsFont = LondrinaSolid({
  weight: "400",
  subsets: ["latin"],
  variable: "--nouns",
});
