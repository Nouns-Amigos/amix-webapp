"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { base, baseSepolia, sepolia } from "viem/chains";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ""}
      config={{
        loginMethods: ["wallet"],
        appearance: {
          theme: "light",
          accentColor: "#3730a3",
          logo: "https://i.ibb.co/gPVq7Sv/kukulcan-auth.png",
        },
        embeddedWallets: {
          createOnLogin: "all-users",
        },
        defaultChain: base,
        supportedChains: [base, baseSepolia, sepolia],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
