import { ChevronDown, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function DaoDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="border-primary/25 pl-2 pr-1.5"
          variant="outline"
          size="sm"
        >
          <span className="mr-1.5">DAO</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-16 mt-1 border-2 border-primary/25 bg-background px-2 py-1.5">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="https://prop.house/0x58fcf38562f7402aad42a27bd783bd0892870536"
              target="_blank"
              rel="noopener noreferrer"
              className="flex"
            >
              <span className="mr-2">Prop House</span>
              <ExternalLink size={16} className="mt-0.5" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="#">
              <span>Bounties</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="#">
              <span>Otras ligas</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="#">
              <span>Miembros</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="#">
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
