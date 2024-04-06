import React from "react";
import Navbar from "../navbar";
import { nounsFont } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PropHouse() {
  return (
    <>
      <Navbar color="warm" />
      <div className="bg-warmBgNouns flex w-full flex-col items-center px-6 text-foreground lg:flex-row lg:justify-center lg:space-x-8 lg:px-32 xl:px-48 xl:pb-16 xl:pt-12">
        <div className="flex w-full flex-col space-y-2 py-12 md:w-3/5 lg:w-1/2">
          <h1
            className={`${nounsFont.className} pb-4 text-center text-5xl md:text-6xl lg:text-left`}
          >
            prop.house
          </h1>
          <div className="flex w-full justify-center lg:hidden">
            <Image
              src="/images/prop-house/prop-house-hero.png"
              alt="Turning ideas into ETH"
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-4/5 lg:w-full"
            />
          </div>
          <p className="text-justify lg:text-lg">
            Nouns Amigos busca fondear ideas que contribuyan al ecosistema
            Nouns. Algunas áreas para enfocarse pueden ser:
            <br />
            <span className="font-semibold">
              Bienes públicos, impacto social, arte, ilustración, animación y
              tecnología.
            </span>
          </p>
          <p className="text-justify lg:text-lg">
            ¡Siempre con el enfoque nounish!
          </p>
          <p className="text-justify lg:text-lg">
            Esto es posible en las rondas de{" "}
            <Link
              href="https://prop.house/0x58fcf38562f7402aad42a27bd783bd0892870536"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#9148B2] hover:text-redNoggles"
            >
              Prop House
            </Link>
            , que es la forma más sencilla y divertida de premiar a las personas
            onchain.
          </p>
        </div>
        <div className="hidden w-1/2 justify-center lg:flex">
          <Image
            src="/images/prop-house/prop-house-hero.png"
            alt="Turning ideas into ETH"
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-4/5 lg:w-full"
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center bg-[#F8F8F8] px-6 text-foreground lg:flex-row lg:justify-center lg:space-x-8 lg:px-32 xl:px-48">
        <div className="flex w-full flex-col items-center space-y-2 py-12 md:w-3/5 md:py-16 lg:w-full xl:pt-20">
          <h2
            className={`${nounsFont.className} pb-4 text-center text-4xl md:text-5xl`}
          >
            Nouns DAO Amigos
            <br className="md:hidden" /> en Prop House
          </h2>
          <div className="grid w-full grid-cols-1 gap-y-4 px-8 py-4 md:grid-cols-2 md:grid-rows-2 md:gap-x-4 md:px-0 lg:grid-cols-4 lg:grid-rows-1">
            <Card className="border-0">
              <CardHeader className="!pb-0">
                <CardTitle
                  className={`${nounsFont.className} text-center text-5xl font-medium text-[#9148B2]`}
                >
                  +50k
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-xl font-semibold md:text-2xl">
                  USD entregados
                </p>
              </CardContent>
            </Card>
            <Card className="border-0">
              <CardHeader className="!pb-0">
                <CardTitle
                  className={`${nounsFont.className} text-center text-5xl font-medium text-[#9148B2]`}
                >
                  +20
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-xl font-semibold md:text-2xl">
                  Rondas ejecutadas
                </p>
              </CardContent>
            </Card>
            <Card className="border-0">
              <CardHeader className="!pb-0">
                <CardTitle
                  className={`${nounsFont.className} text-center text-5xl font-medium text-[#9148B2]`}
                >
                  +300
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-xl font-semibold md:text-2xl">
                  Propuestas recibidas
                </p>
              </CardContent>
            </Card>
            <Card className="border-0">
              <CardHeader className="!pb-0">
                <CardTitle
                  className={`${nounsFont.className} text-center text-5xl font-medium text-[#9148B2]`}
                >
                  +3k
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-xl font-semibold md:text-2xl">
                  Votos emitidos
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-lg font-medium lg:max-w-2xl lg:text-xl">
            Prop House es un proyecto nacido y financiado por{" "}
            <span className="font-extrabold">Nouns DAO</span>.
            <br />
            Sirve como una invitación abierta para que todas las comunidades
            onchain construyan el mundo que quieren ver.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center bg-transparent px-6 text-foreground lg:flex-row lg:justify-center lg:space-x-8 lg:px-32 xl:px-48">
        <div className="flex w-full flex-col items-center space-y-2 py-12 md:w-3/4 md:py-16 lg:w-full xl:pt-20">
          <h2
            className={`${nounsFont.className} pb-4 text-center text-4xl md:text-5xl`}
          >
            ¿Cómo funcionan las rondas de fondeo?
          </h2>
          <p className="text-center text-lg lg:max-w-2xl lg:text-xl">
            Las comunidades realizan rondas de financiamiento en sus "casas
            comunitarias". En estas rondas, los creadores pueden proponer ideas
            para ser financiadas.
          </p>
          <div className="grid w-full grid-cols-1 gap-y-4 px-8 py-4 md:grid-cols-2 md:grid-rows-3 md:gap-x-4 md:gap-y-2 md:px-0 lg:grid-cols-3 lg:grid-rows-2 lg:gap-4 xl:max-w-4xl xl:gap-x-8">
            <div className="flex flex-col space-y-1">
              <h4 className="text-left text-xl font-semibold">
                1. Desarrolla tu idea
              </h4>
              <Card className="flex-grow border-0">
                <CardHeader>
                  <CardTitle className="text-justify text-base font-normal">
                    Si tienes una idea, conviértela en una propuesta.
                    Compártela, busca retroalimentación y mejórala.
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="flex flex-col space-y-1">
              <h4 className="text-left text-xl font-semibold">2. Participa</h4>
              <Card className="flex-grow border-0">
                <CardHeader>
                  <CardTitle className="text-justify text-base font-normal">
                    Busca una ronda y "sube" tu propuesta en Prop House. Es lo
                    primero que verá la comunidad, ¡y tal vez lo único!
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="flex flex-col space-y-1">
              <h4 className="text-left text-xl font-semibold">
                3. Involúcrate
              </h4>
              <Card className="flex-grow border-0">
                <CardHeader>
                  <CardTitle className="text-justify text-base font-normal">
                    Participa en las sesiones de pitcheo, súmate a las llamadas
                    de la comunidad, comparte en redes, etc.
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="flex flex-col space-y-1">
              <h4 className="text-left text-xl font-semibold">4. Gana</h4>
              <Card className="flex-grow border-0">
                <CardHeader>
                  <CardTitle className="text-justify text-base font-normal">
                    Los holders votarán, y una vez terminada la votación, se
                    anunciará a los ganadores. En este paso puedes reclamar el
                    premio monetario.
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="flex flex-col space-y-1">
              <h4 className="text-left text-xl font-semibold">5. Construye</h4>
              <Card className="flex-grow border-0">
                <CardHeader>
                  <CardTitle className="text-justify text-base font-normal">
                    ¡A trabajar! Comparte avances, colabora con la comunidad y
                    hazlo divertido.
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="flex flex-col space-y-1">
              <h4 className="text-left text-xl font-semibold">6. Recibe</h4>
              <Card className="flex-grow border-0">
                <CardHeader>
                  <CardTitle className="text-justify text-base font-normal">
                    Con los avances y entrega final de tu proyecto, podrás
                    llenar el formulario para recibir tu token AMIGO.
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-y-6 px-4 py-4 lg:flex-row lg:px-0 xl:max-w-3xl">
            <div className="w-full lg:w-2/3 lg:pr-12">
              <p className="text-justify text-lg font-medium lg:text-left lg:text-xl">
                Únete al Discord de Nouns Amigos y conéctate con la comunidad
                para resolver cualquier duda.
              </p>
            </div>
            <div className="flex w-full items-center justify-center lg:w-1/3 lg:justify-between lg:gap-x-4">
              <p className="hidden text-5xl lg:block">→</p>
              <Button
                size="lg"
                className="w-2/3 bg-[#9148B2] px-6 py-4 text-lg font-semibold text-brandWhite md:w-1/2 lg:w-auto lg:text-xl"
              >
                ¡Súmate aquí!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
