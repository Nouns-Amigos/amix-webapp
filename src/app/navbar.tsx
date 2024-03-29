"use client";

import Image from "next/image";
import Link from "next/link";

import { nounsFont } from "@/lib/fonts";

import { Button, buttonVariants } from "@/components/ui/button";
import HamburgerMenu from "@/components/layout/hamburgerMenu";
import TreasuryButton from "@/components/layout/treasuryButton";
import { usePathname } from "next/navigation";

export default function Navbar({ color }: { color?: "cool" | "warm" }) {
  const pathname = usePathname();
  let navbarBgTwClass = "bg-transparent";
  switch (color) {
    case "cool":
      navbarBgTwClass = "bg-[#D5D7E1]";
      break;
    case "warm":
      navbarBgTwClass = "bg-[#E1D7D5]";
      break;
    default:
      navbarBgTwClass = "bg-transparent";
      break;
  }
  return (
    <nav className={`h-20 md:h-24 ${navbarBgTwClass}`}>
      <div className="mx-auto flex h-full max-w-7xl justify-between px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center space-x-0 md:space-x-4">
          <Link href="/" className="flex items-center gap-1 px-2 text-black">
            <div className="flex items-center">
              <Image
                src="/icons/noggles.png"
                alt="Noggles"
                width="0"
                height="0"
                sizes="100vw"
                className="h-6 w-full transition duration-300 ease-in-out hover:scale-90 md:h-8"
              />
            </div>
            <span
              className={`${nounsFont.className} text-3xl font-semibold md:text-4xl`}
            >
              amigos
            </span>
          </Link>
          <TreasuryButton />
        </div>

        {/* Primary Navbar items */}
        <div className="mr-1 hidden items-center space-x-4 lg:flex">
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              size: "default",
              className: `border-primary px-3 py-2.5 text-base font-semibold hover:!bg-primary hover:text-white md:px-4 md:py-3 ${
                pathname === "/" &&
                "border-white bg-white hover:!bg-white hover:!text-black"
              }`,
            })}
          >
            Inicio
          </Link>
          <Link
            href="/dao"
            className={buttonVariants({
              variant: "outline",
              size: "default",
              className: `border-primary px-3 py-2.5 text-base font-semibold hover:!bg-primary hover:text-white md:px-4 md:py-3 ${
                pathname === "/nouns-dao-amigos" &&
                "border-white bg-white hover:!bg-white hover:!text-black"
              }`,
            })}
          >
            DAO
          </Link>
          <Link
            href="/prop-house"
            className={buttonVariants({
              variant: "outline",
              size: "default",
              className: `border-primary px-3 py-2.5 text-base font-semibold hover:!bg-primary hover:text-white md:px-4 md:py-3 ${
                pathname === "/prop-house" &&
                "border-white bg-white hover:!bg-white hover:!text-black"
              }`,
            })}
          >
            Prop House
          </Link>
          <Link
            href="/token-amigo"
            className={buttonVariants({
              variant: "outline",
              size: "default",
              className: `border-primary px-3 py-2.5 text-base font-semibold hover:!bg-primary hover:text-white md:px-4 md:py-3 ${
                pathname === "/token-amigo" &&
                "border-white bg-white hover:!bg-white hover:!text-black"
              }`,
            })}
          >
            Token
          </Link>
          {/* <CollectionDropdownButton /> */}
          <Button
            size="default"
            className={`${nounsFont.className} text-md bg-black p-2.5 text-base hover:bg-primary hover:text-white md:px-4 md:py-3`}
          >
            Entrar
          </Button>
        </div>

        <div className="mr-1 flex items-center lg:hidden">
          <HamburgerMenu />
        </div>
      </div>
    </nav>
  );
}
