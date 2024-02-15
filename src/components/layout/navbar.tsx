import Image from "next/image";
import Link from "next/link";

import { nounsFont } from "@/lib/fonts";

import { Button, buttonVariants } from "@/components/ui/button";
import HamburgerMenu from "./hamburgerMenu";
import DaoDropdownMenu from "./daoDropdownButton";
import CollectionDropdownButton from "./collectionDropdownButton";
import TreasuryButton from "./treasuryButton";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 h-16 bg-background">
      <div className="mx-auto flex h-full max-w-7xl justify-between px-4">
        <div className="flex items-center space-x-0 md:space-x-4">
          <Link
            href="/"
            className="flex items-center gap-1 px-2 text-black hover:text-primary"
          >
            <div className="flex items-center">
              <Image
                src="/icons/noggles.png"
                alt="Noggles"
                height={24}
                width={64}
              />
            </div>
            <span
              className={`${nounsFont.className} text-[26px] font-semibold`}
            >
              amigos
            </span>
          </Link>
          <TreasuryButton />
        </div>

        {/* Primary Navbar items */}
        <div className="hidden items-center space-x-4 lg:flex">
          <DaoDropdownMenu />
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Comunidad
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Recursos
          </Link>
          <CollectionDropdownButton />
          <Button
            variant="default"
            size="sm"
            className={`${nounsFont.className} text-md`}
          >
            Entrar
          </Button>
        </div>

        <div className="flex items-center lg:hidden">
          <HamburgerMenu />
        </div>
      </div>
    </nav>
  );
}
