import Image from "next/image";

import { nounsFont } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <div className="h-[calc(100svh-64px)]">
        <div className="container flex h-[50%] w-full flex-col justify-center gap-y-3 pb-4  pt-12 md:max-w-lg md:px-8 md:py-20 lg:max-w-2xl lg:py-12 lg:text-center xl:py-20">
          <h1
            className={`${nounsFont.className} text-left text-4xl xs:text-5xl md:text-center md:text-6xl`}
          >
            Te damos la <br className="md:hidden" />
            bienvenida a <br className="md:hidden" />
            <span className="text-5xl font-medium text-secondary xs:text-6xl md:text-7xl">
              Nouns Amigos
            </span>
          </h1>
          <h4 className={`${nounsFont.className} mt-4 text-2xl sm:text-[2rem]`}>
            Aquí podrás descubrir lo que hace la comunidad de Nouns en español
          </h4>
          <div className="flex w-full justify-center">
            <Button
              size="lg"
              className={`${nounsFont.className} z-10 mt-4 text-2xl font-medium tracking-wide md:mt-10`}
            >
              🚧 En construcción 🏗️
            </Button>
          </div>
        </div>
        <div className="relative flex h-[50%] w-full items-end">
          <div className="bottom-0 w-full">
            <div className="-z-10 h-72 w-72 xs:h-96 xs:w-96 md:h-[416px] md:w-[416px] lg:h-80 lg:w-80 2xl:h-[480px] 2xl:w-[480px]">
              <Image
                src="/icons/android-chrome-512x512.png"
                alt="AMIGO token #1: a burro with noggles and a red shirt that says 'hola'"
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <WhatIsNouns />
    </>
  );
}

function WhatIsNouns() {
  return (
    <div className="container flex h-full flex-col gap-y-6 bg-primary py-16 text-brandWhite md:max-w-lg md:px-8 md:py-20 lg:max-w-2xl lg:py-12 lg:text-center xl:py-20">
      <div>
        <h2
          className={`${nounsFont.className} text-left text-3xl xs:text-4xl md:text-center md:text-5xl`}
        >
          Construye con{" "}
          <span className="font-outline-2 text-3xl font-medium text-[#EE6DA1] xs:text-4xl md:text-5xl">
            Nouns
          </span>{" "}
          y fondea tus ideas
        </h2>
        <p className={`mt-2 text-[22px] sm:text-[2rem]`}>
          Nouns Amigos nace como una comunidad donde la gente de habla hispana
          puede aprender sobre Nouns y crear proyectos divertidos con impacto
          social
        </p>
      </div>
      <div>
        <h3
          className={`${nounsFont.className} text-left text-3xl xs:text-4xl md:text-center md:text-5xl`}
        >
          ¿Qué es Nouns?
        </h3>
        <p className={`mt-2 text-[22px] sm:text-[2rem]`}>
          Nouns es un experimento creativo de marca y coordinación humana. El
          nacimiento se da como una colección de arte digital, donde se subasta
          una pieza (un Noun) cada día. Este Noun funge como membresía para la
          Nouns DAO, organismo que administra la tesorería.
        </p>
      </div>
      <div>
        <h3
          className={`${nounsFont.className} text-left text-3xl xs:text-4xl md:text-center md:text-5xl`}
        >
          Ahora en español 😅
        </h3>
        <p className={`mt-2 text-[22px] sm:text-[2rem]`}>
          Nouns fondea ideas. Puedes crear una propuesta con un presupuesto, y
          compartirla en Prop House para evaluación. Se necesitan ideas
          atrevidas, con impacto social, proyectos "Nounish". Pero, esto puede
          ser desafiante...
        </p>
      </div>
      <h4
        className={`${nounsFont.className} mt-4 text-2xl xs:text-3xl sm:text-[2rem]`}
      >
        Para llevar la misión de Nouns a todos lados, un grupo de amigos decidió
        crear una SubDAO de Nouns.
      </h4>
    </div>
  );
}
