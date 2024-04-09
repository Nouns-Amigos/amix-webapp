"use client";

import Image from "next/image";
import Link from "next/link";

import { nounsFont } from "@/lib/fonts";

import { Button, buttonVariants } from "@/components/ui/button";
import TreasuryButton from "./treasuryButton";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="sticky top-0 z-10 h-20 bg-background md:h-24">
      <div className="mx-auto flex h-full max-w-7xl justify-between px-4">
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
        <div className="hidden items-center space-x-4 lg:flex">
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
                pathname === "/dao" &&
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
          <Button
            size="default"
            className={`${nounsFont.className} text-md bg-black p-2.5 text-base hover:bg-primary hover:text-white md:px-4 md:py-3`}
          >
            Entrar
          </Button>
        </div>
      </div>
    </nav>
  );
}
