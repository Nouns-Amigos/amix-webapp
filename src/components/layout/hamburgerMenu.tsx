"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";

// type HamburgerMenuProps = {
//   menuItems?: [{ displayText: string; href: string }];
// };

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger>
        <Menu size={28} />
      </SheetTrigger>
      <SheetContent className="border-l-0 bg-background">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4">
          <Link
            href="https://prop.house/0x58fcf38562f7402aad42a27bd783bd0892870536"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">Prop House</span>
            <ExternalLink size={14} />
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Bounties</span>
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">Otras ligas</span>
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">Miembros</span>
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">Dashboard</span>
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            Comunidad
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            Recursos
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">NFT: Características</span>
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">Colección</span>
          </Link>
          <Link
            href="#"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mr-2">Área de Juegos</span>
          </Link>
          <Link
            href="/entrar"
            className={buttonVariants({ variant: "default", size: "sm" })}
            onClick={() => setIsMenuOpen(false)}
          >
            Entrar
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
