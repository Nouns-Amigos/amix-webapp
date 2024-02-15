"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import useAlchemy from "@/services/alchemy";
import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { number } from "zod";

const grantsAccountAddress = "0x9d8571a3e0f12e838264291eb3d1f5266f88ed4c";

const PropHouseAccountAddress = "0x5f654f869bcfabdd02639a89286048b87995cde1";

function TreasuryButton() {
  const [treasuryBalance, setTreasuryBalance] = useState<number | undefined>(
    undefined,
  );
  const alchemy = useAlchemy();
  async function getTreasuryBalance() {
    try {
      const grantsAccountBalance = await alchemy.core.getBalance(
        grantsAccountAddress,
        "safe",
      );
      const propHouseAccountBalance = await alchemy.core.getBalance(
        PropHouseAccountAddress,
        "safe",
      );

      setTreasuryBalance(
        Number(formatEther(BigInt(grantsAccountBalance._hex))) +
          Number(formatEther(BigInt(propHouseAccountBalance._hex))),
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    void getTreasuryBalance();
  }, []);
  return (
    <Link
      href="https://etherscan.io/address/0x9581587991da459409b4e7e3b44daa1e65e589ec"
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonVariants({
        variant: "outline",
        size: "sm",
      })} border-primary`}
    >
      <span className="mr-2.5 hidden text-slate-600 lg:block">Tesorería</span>
      {treasuryBalance ? `Ξ ${(treasuryBalance as number).toFixed(2)}` : "..."}
    </Link>
  );
}

export default TreasuryButton;
