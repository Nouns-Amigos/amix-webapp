"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/navbar";

interface AuthenticatedPageProps {
  children: React.ReactNode;
  className: string;
}

const AuthenticatedPage = ({ children, className }: AuthenticatedPageProps) => {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) router.push("/");
  }, [ready, authenticated, router]);

  if (!ready) {
    return (
      <>
        <Navbar />
        <div
          className={`min-h-[calc(100svh-5rem)] md:min-h-[calc(100svh-6rem)] ${className} w-full py-8`}
        >
          <div
            className="text-surface inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          />
          <p className="text-xl">cargando...</p>
        </div>
      </>
    );
  }

  if (ready && !authenticated) {
    return (
      <>
        <Navbar />
        <div
          className={`min-h-[calc(100svh-5rem)] md:min-h-[calc(100svh-6rem)] ${className} w-full py-8`}
        >
          <p className="text-xl">redirigiendo...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div
        className={`min-h-[calc(100svh-5rem)] md:min-h-[calc(100svh-6rem)] ${className} w-full py-8`}
      >
        {children}
      </div>
    </>
  );
};

export default AuthenticatedPage;
