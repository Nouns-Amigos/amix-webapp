import {
  Inter,
  Londrina_Solid as LondrinaSolid,
  Nunito,
  Raleway,
} from "next/font/google";

export const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const nounsFont = LondrinaSolid({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-nouns",
});

export const nunitoFont = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const ralewayFont = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});
