import Image from "next/image";

import { nounsFont } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <div className="h-full md:h-[calc(100svh-64px)]">
        <div className="flex h-1/2 w-full flex-col justify-center gap-y-2 px-4 pt-8 md:max-w-xl md:gap-y-3 md:px-8 md:pt-20 lg:max-w-2xl lg:pt-12 lg:text-center xl:pt-20">
          <h1
            className={`${nounsFont.className} text-left text-4xl xs:text-5xl md:text-center md:text-6xl`}
          >
            Construye con
            <br />
            <span className="text-5xl font-medium text-secondary xs:text-6xl md:text-7xl">
              Nouns Amigos
            </span>
            <br />y fondea tus ideas
          </h1>
          <h4
            className={`${nounsFont.className} mt-4 text-2xl sm:text-[2rem] md:text-center`}
          >
            Descubre todo lo que puedes hacer con la comunidad de Nouns en
            español
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
        <div className="relative flex h-1/2 w-full items-end">
          <div className="bottom-0 flex w-full justify-center">
            <div className="relative -z-10 h-72 w-72 xs:h-96 xs:w-96 md:h-[416px] md:w-[416px] lg:h-80 lg:w-80 2xl:h-[480px] 2xl:w-[480px]">
              <Image
                src="/icons/android-chrome-512x512.png"
                alt="AMIGO token #1: a burro with noggles wearing a red shirt that says 'hola'"
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <WhatIsNounsSection />
    </>
  );
}

function WhatIsNounsSection() {
  return (
    <div className="w-full bg-primary lg:flex lg:justify-center">
      <div className="flex h-full flex-col gap-y-6 px-8 py-16 text-brandWhite md:py-20 lg:max-w-3xl lg:py-12 lg:text-center xl:py-20">
        <div className="w-full md:flex md:flex-col">
          <h2
            className={`${nounsFont.className} text-left text-3xl xs:text-4xl md:text-center`}
          >
            Te damos la bienvenida a <br />
            <span className="text-5xl font-medium text-[#EE6DA1] xs:text-6xl">
              Nouns Amigos
            </span>
          </h2>
          <div className="flex flex-col gap-y-4 md:flex-row">
            <div className="w-full md:flex md:w-1/2 md:items-center md:pl-16 md:pr-2">
              <p className="mt-2 text-[22px] sm:text-[2rem] md:text-2xl lg:text-left">
                Nouns Amigos nace como una comunidad donde la gente de habla
                hispana puede aprender sobre Nouns y crear proyectos divertidos
                con impacto social
              </p>
            </div>
            <div className="flex w-full justify-center md:w-1/2 md:px-8">
              <div className="relative aspect-square w-full">
                <Image
                  src="/icons/android-chrome-512x512.png"
                  alt="AMIGO token #1: a burro with noggles wearing a red shirt that says 'hola'"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-4">
          <h2
            className={`${nounsFont.className} text-left text-3xl xs:text-4xl md:px-12`}
          >
            ¿Qué es Nouns?
          </h2>
          <div className="flex flex-col gap-y-4 md:flex-row">
            <div className="hidden w-full md:flex md:w-1/3 md:justify-center">
              <div className="relative aspect-square w-full">
                <Image
                  src="/icons/android-chrome-512x512.png"
                  alt="AMIGO token #1: a burro with noggles wearing a red shirt that says 'hola'"
                  fill
                />
              </div>
            </div>
            <div className="w-full md:flex md:w-2/3 md:flex-col md:items-center md:gap-y-2 md:px-4 lg:text-left">
              <p className="text-[22px] sm:text-[2rem] md:text-2xl">
                Nouns es un experimento creativo de coordinación humana.
              </p>
              <p className="text-[22px] sm:text-[2rem] md:text-2xl">
                El nacimiento se da como una colección de arte digital, donde se
                subasta una pieza (un Noun) cada día.
              </p>{" "}
              <p className="text-[22px] sm:text-[2rem] md:text-2xl">
                Este Noun funge como membresía para la Nouns DAO, organismo que
                administra la tesorería.
              </p>
            </div>
          </div>
          <div className="aspect-video md:mt-6 md:px-8">
            <iframe
              className="h-full w-full"
              // width="560"
              // height="315"
              src="https://www.youtube.com/embed/lOzCA7bZG_k?si=eaJujb_skKPeakI9"
              title="¿Qué es Nouns?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 md:container md:mt-8 md:gap-y-4">
          <h3 className="text-center text-2xl md:text-3xl">
            Ahora en español 😅
          </h3>
          <div className="flex flex-col gap-y-4">
            <h2
              className={`${nounsFont.className} text-center text-3xl xs:text-4xl md:text-5xl`}
            >
              Nouns fondea{" "}
              <span className="font-bold underline decoration-secondary decoration-4 underline-offset-8">
                ideas
              </span>
            </h2>
            <p className="text-[22px] sm:text-[2rem] md:max-w-2xl md:text-2xl">
              Puedes crear una propuesta con un presupuesto, y compartirla en
              Prop House para evaluación. Se necesitan ideas atrevidas, con
              impacto social, proyectos "
              <span className="underline decoration-secondary decoration-4 underline-offset-4">
                Nounish
              </span>
              ". Pero, esto puede ser desafiante...
            </p>
          </div>
        </div>
        <div className="container flex w-full flex-col justify-center md:max-w-xl md:text-center">
          <h4
            className={`${nounsFont.className} mt-4 text-2xl xs:text-3xl sm:text-[2rem]`}
          >
            Para llevar la misión de Nouns a todos lados, un grupo de amigos
            decidió crear una SubDAO de Nouns:{" "}
            <span className="text-[#EE6DA1]">Nouns Amigos</span>
          </h4>
          <div className="flex justify-center">
            <Button
              variant="secondary"
              size="lg"
              className={`${nounsFont.className} z-10 mt-4 text-2xl font-medium tracking-wide md:mt-10`}
            >
              Descubre nuestra DAO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
