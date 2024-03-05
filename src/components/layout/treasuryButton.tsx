"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useAlchemy from "@/services/alchemy";
import { formatEther } from "viem";
import { ExternalLink } from "lucide-react";

const grantsAccountAddress = "0x9d8571a3e0f12e838264291eb3d1f5266f88ed4c";

const propHouseAccountAddress = "0x5f654f869bcfabdd02639a89286048b87995cde1";

function TreasuryButton() {
  const [grantsAccountBalance, setGrantsAccountBalance] = useState<
    number | undefined
  >(undefined);
  const [propHouseAccountBalance, setPropHouseAccountBalance] = useState<
    number | undefined
  >(undefined);
  const [treasuryBalance, setTreasuryBalance] = useState<number | undefined>(
    undefined,
  );
  const [isTreasuryBalanceFetched, setIsTreasuryBalanceFetched] =
    useState(false);
  const alchemy = useAlchemy();
  async function getTreasuryBalance() {
    try {
      const grantsAccountBal = await alchemy.core.getBalance(
        grantsAccountAddress,
        "safe",
      );
      const propHouseAccountBal = await alchemy.core.getBalance(
        propHouseAccountAddress,
        "safe",
      );

      setGrantsAccountBalance(
        Number(formatEther(BigInt(grantsAccountBal._hex))),
      );
      setPropHouseAccountBalance(
        Number(formatEther(BigInt(propHouseAccountBal._hex))),
      );
      setTreasuryBalance(
        Number(formatEther(BigInt(grantsAccountBal._hex))) +
          Number(formatEther(BigInt(propHouseAccountBal._hex))),
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!isTreasuryBalanceFetched) {
      void getTreasuryBalance();
      setIsTreasuryBalanceFetched(true);
    }
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="border-primary pl-2 pr-1.5"
          variant="outline"
          size="sm"
        >
          {/* <Link
            href="https://etherscan.io/address/0x9581587991da459409b4e7e3b44daa1e65e589ec"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonVariants({
              variant: "outline",
              size: "sm",
            })} border-primary/100`}
          > */}
          <span className="mr-2.5 hidden text-slate-600 lg:block">
            Tesorería
          </span>
          {treasuryBalance ? `Ξ ${treasuryBalance.toFixed(2)}` : "..."}
          {/* </Link> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 border-2 border-primary/25 bg-background px-2 py-1.5 md:ml-48 lg:ml-44 xl:ml-40">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`https://etherscan.io/address/${grantsAccountAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full justify-start space-x-3"
            >
              <span>
                {grantsAccountBalance
                  ? `Ξ ${grantsAccountBalance.toFixed(2)}`
                  : "..."}
              </span>
              <div className="flex flex-grow items-center justify-between">
                <span className="mr-2">grants.nounsamigos.eth</span>
                <ExternalLink size={14} />
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`https://etherscan.io/address/${propHouseAccountAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full justify-start space-x-3"
            >
              <span>
                {propHouseAccountBalance
                  ? `Ξ ${propHouseAccountBalance.toFixed(2)}`
                  : "..."}
              </span>
              <span className="mr-2">prophouse.nounsamigos.eth</span>
              <ExternalLink size={14} />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TreasuryButton;
