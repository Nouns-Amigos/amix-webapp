"use client";

import Image from "next/image";
import Link from "next/link";
import { useLogin, useLogout, usePrivy } from "@privy-io/react-auth";

import { nounsFont } from "@/lib/fonts";
import localFont from "next/font/local";

import { Button, buttonVariants } from "@/components/ui/button";
import HamburgerMenu from "@/components/layout/hamburgerMenu";
import TreasuryButton from "@/components/layout/treasuryButton";
import { useRouter, usePathname } from "next/navigation";

const logoFont = localFont({
  src: "../lib/local-fonts/SFProDisplay-Heavy.ttf",
});

export default function Navbar({ color }: { color?: "cool" | "warm" }) {
  const pathname = usePathname();
  const router = useRouter();

  const { ready, authenticated } = usePrivy();
  const { login } = useLogin({
    // Set up an `onComplete` callback to run when `login` completes
    onComplete(user, isNewUser, wasPreviouslyAuthenticated) {
      console.log("🔑 ✅ Login success", {
        user,
        isNewUser,
        wasPreviouslyAuthenticated,
      });
      if (!wasPreviouslyAuthenticated) router.push("/impacto-nouns-amigos");
    },
    // Set up an `onError` callback to run when there is a `login` error
    onError(error) {
      console.log("🔑 🚨 Login error", { error });
    },
  });
  const { logout } = useLogout();

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
        <div className="flex w-3/4 items-center justify-start space-x-0 md:space-x-4 lg:w-1/2">
          <Link
            href="/"
            className="flex w-auto items-center gap-1 px-2 text-black"
          >
            <div className="flex h-full w-auto flex-grow items-center">
              <Image
                src="/icons/noggles.png"
                alt="Noggles"
                width="0"
                height="0"
                sizes="100vw"
                className="h-6 w-auto transition duration-300 ease-in-out hover:scale-90 md:h-7"
              />
            </div>
            <span
              className={`${logoFont.className} mb-0.5 text-2xl font-semibold md:mb-1 md:text-[1.75rem]`}
            >
              amigos
            </span>
          </Link>
          <TreasuryButton />
        </div>

        {/* Primary Navbar items */}
        <div className="mr-1 hidden items-center space-x-4 lg:flex lg:w-1/2 lg:justify-end">
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
            href="/nouns-dao-amigos"
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
            href="https://hackmd.io/@nounsamigos/wiki"
            target="_blank"
            className={buttonVariants({
              variant: "outline",
              size: "default",
              className: `border-primary px-3 py-2.5 text-base font-semibold hover:!bg-primary hover:text-white md:px-4 md:py-3 ${
                pathname === "/prop-house" &&
                "border-white bg-white hover:!bg-white hover:!text-black"
              }`,
            })}
          >
            Grants
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
            variant={authenticated ? "outline" : "default"}
            className={
              authenticated
                ? "border-primary px-3 py-2.5 font-semibold hover:!bg-primary hover:text-white md:px-4 md:py-3"
                : `${nounsFont.className} bg-black p-2.5 text-base hover:bg-primary hover:text-white md:px-4 md:py-3`
            }
            onClick={authenticated ? logout : login}
          >
            {authenticated ? "Salir" : "Entrar"}
          </Button>
        </div>

        <div className="mr-1 flex w-1/4 items-center justify-end lg:hidden">
          <HamburgerMenu
            authenticated={authenticated}
            login={login}
            logout={logout}
          />
        </div>
      </div>
    </nav>
  );
}
