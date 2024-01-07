import Image from "next/image";

import { nounsFont } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="container flex h-full flex-col items-center px-4 px-6 py-12 md:max-w-lg md:px-8 md:py-20 lg:max-w-2xl lg:py-12 lg:text-center xl:py-20">
      <h1 className={`${nounsFont.className} text-4xl md:text-6xl`}>
        Te damos la <br className="md:hidden" />
        bienvenida a <br />
        <span className=" text-5xl font-medium text-secondary md:text-7xl">
          Nouns Amigos
        </span>
      </h1>
      <h3 className={`${nounsFont.className} mt-4 text-2xl sm:text-[2rem]`}>
        Aquí podrás descubrir lo que hace la comunidad de Nouns en español
      </h3>
      <Button
        size="lg"
        className={`${nounsFont.className} z-10 mt-4 text-xl tracking-wide md:mt-10`}
      >
        🚧 En construcción 🏗️
      </Button>
      <div className="absolute bottom-0">
        <div className="-z-10 h-80 w-80 md:h-[416px] md:w-[416px] lg:h-80 lg:w-80 2xl:h-[480px] 2xl:w-[480px]">
          <Image
            src="/icons/android-chrome-512x512.png"
            alt="AMIGO token #1: a burro with noggles and a red shirt that says 'hola'"
            fill
          />
        </div>
      </div>
    </div>
  );
}
