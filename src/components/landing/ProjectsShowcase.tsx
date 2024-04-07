"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { nounsFont } from "@/lib/fonts";

export function ProjectsShowcase() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <div className="w-full bg-[#EBEBEB] text-foreground lg:flex lg:justify-center lg:px-24 xl:px-32">
      <div className="flex h-full w-full max-w-7xl flex-col gap-y-4 px-6 py-16 md:px-16 md:py-20 lg:px-0 lg:text-center xl:px-16">
        <div className="lg:hidden">
          <h3
            className={`${nounsFont.className} text-left text-4xl lg:text-5xl`}
          >
            Construye con nosotros y haz realidad tu proyecto
          </h3>

          <p className="mt-2 text-lg md:text-xl lg:text-left">
            Desde meet-ups, construir unos Noggles gigantes en Japón, o crear
            proyectos tecnológicos,{" "}
            <span className="font-bold">
              en Nouns Amigos DAO apoyamos proyectos de todos los tamaños.
            </span>
          </p>
        </div>
        <div className="flex w-full flex-col items-center space-y-4 px-4 lg:flex-row lg:items-start lg:justify-center lg:px-0">
          <h4
            className={`${nounsFont.className} text-center text-4xl font-light lg:hidden lg:text-[40px]`}
          >
            {PROJECTS_ARRAY[current]?.title}
          </h4>
          <div className="flex w-full max-w-xs flex-col items-center space-y-4 md:max-w-md lg:max-w-7xl lg:flex-row lg:items-start lg:space-x-8 lg:space-y-0">
            <Carousel className="w-full lg:w-[47.5%]" setApi={setApi}>
              <CarouselContent className="h-full">
                {PROJECTS_ARRAY.map((project, index) => (
                  <CarouselItem key={index}>
                    <div className="h-full">
                      <div className="flex h-full w-full items-center justify-center">
                        <Image
                          src={
                            project.imageSrc ??
                            "/icons/android-chrome-512x512.png"
                          }
                          alt={project.imageAlt ?? "Image showing the project"}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="lg:hidden" />
              <CarouselNext className="lg:hidden" />
            </Carousel>
            <div className="w-full lg:w-[52.5%]">
              <div className="hidden text-left lg:block xl:pb-12">
                <h3 className={`${nounsFont.className} text-4xl xl:text-5xl`}>
                  Construye con nosotros y haz realidad tu proyecto
                </h3>

                <p className="pt-2 text-lg">
                  Desde meet-ups, construir unos Noggles gigantes en Japón, o
                  crear proyectos tecnológicos,{" "}
                  <span className="font-bold">
                    en Nouns Amigos DAO apoyamos proyectos de todos los tamaños.
                  </span>
                </p>
              </div>
              <div className="hidden lg:block lg:py-3 xl:py-4">
                <hr className="border-[1.25px] border-black" />
              </div>
              <div className="hidden items-center lg:flex">
                <Image
                  src="/images/arrow.svg"
                  alt="Arrow"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-16"
                />
                <h4
                  className={`${nounsFont.className} hidden text-left text-4xl font-light lg:block xl:text-[42px]`}
                >
                  {PROJECTS_ARRAY[current]?.title}
                </h4>
              </div>
              <div className="flex flex-col space-y-1 text-left lg:pt-2">
                {PROJECTS_ARRAY[current]?.content}
                {PROJECTS_ARRAY[current]?.stats}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type projectElement = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  content: ReactNode;
  stats: ReactNode;
};

const PROJECTS_ARRAY: projectElement[] = [
  {
    title: "Nouns Amigos en Lima",
    imageSrc: "/images/landing/projects/pizzagaleria.jpeg",
    imageAlt:
      "AMIGO token #1: a burro with noggles wearing a red shirt that says 'hola'",
    content: (
      <>
        <p className="text-lg font-bold">
          Side Event PizzaDAO ETH Lima, Perú. Fortaleciendo comunidad Web3
        </p>
        <p className="">
          Nouns Amigos asistirá al ETHEREUM Lima Perú, gracias a nuestros amigos
          de PizzaDAO, quienes realizarán un side event durante uno de los
          eventos más esperados de este 2024
        </p>
      </>
    ),
    stats: (
      <ul>
        <li>
          Fecha: <span className="font-semibold">03 de febrero de 2024</span>
        </li>
        <li>
          Lugar: <span className="font-semibold">Lima, Perú</span>
        </li>
        <li>
          Categoría: <span className="font-semibold">Meetups</span>
        </li>
      </ul>
    ),
  },
  {
    title: "Nouns Gigantes",
    imageSrc: "/images/landing/projects/nouns-gigantes.jpeg",
    imageAlt:
      "AMIGO token #1: a burro with noggles wearing a red shirt that says 'hola'",
    content: (
      <>
        <p className="text-lg font-bold">Esto hicimos</p>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          impedit modi ipsum velit dolores corporis praesentium, voluptate nulla
          explicabo, beatae, neque ullam.
        </p>
      </>
    ),
    stats: (
      <ul>
        <li>
          Fecha: <span className="font-semibold">03 de marzo de 2024</span>
        </li>
        <li>
          Lugar: <span className="font-semibold">CDMX, México</span>
        </li>
        <li>
          Categoría: <span className="font-semibold">Visita</span>
        </li>
      </ul>
    ),
  },
  {
    title: "ETH Bogotá",
    imageSrc: "/images/landing/projects/eth-bogota.jpeg",
    imageAlt:
      "AMIGO token #1: a burro with noggles wearing a red shirt that says 'hola'",
    content: (
      <>
        <p className="text-lg font-bold">Esto construimos con código</p>
        <p className="">
          Ratione cum dicta doloremque molestiae veritatis, reiciendis
          voluptates corrupti tempore, ! Lorem ipsum dolor sit amet consectetur
          adipisicing elit.
        </p>
      </>
    ),
    stats: (
      <ul>
        <li>
          Fecha: <span className="font-semibold">03 de diciembre de 2024</span>
        </li>
        <li>
          Lugar: <span className="font-semibold">Buenos Aires, Argentina</span>
        </li>
        <li>
          Categoría: <span className="font-semibold">Código</span>
        </li>
      </ul>
    ),
  },
  {
    title: "Noggles Colores",
    imageSrc: "/images/landing/projects/noggles-colors.jpeg",
    imageAlt:
      "AMIGO token #1: a burro with noggles wearing a red shirt that says 'hola'",
    content: (
      <>
        <p className="text-lg font-bold">Otro proyecto chido</p>
        <p className="">
          Nouns Amigos asistirá al ETHEREUM Lima Perú, gracias a nuestros amigos
          de PizzaDAO, quienes realizarán un side event durante uno de los
          eventos más esperados de este 2024
        </p>
      </>
    ),
    stats: (
      <ul>
        <li>
          Fecha: <span className="font-semibold">03 de febrero de 2024</span>
        </li>
        <li>
          Lugar: <span className="font-semibold">Lima, Perú</span>
        </li>
        <li>
          Categoría: <span className="font-semibold">Meetups</span>
        </li>
      </ul>
    ),
  },
  {
    title: "Pizza entre Amigos",
    imageSrc: "/images/landing/projects/nouns-frutero.jpeg",
    imageAlt:
      "AMIGO token #1: a burro with noggles wearing a red shirt that says 'hola'",
    content: (
      <>
        <p className="text-lg font-bold">EntrepreNoun let's goooo</p>
        <p className="">
          Nouns Amigos asistirá al ETHEREUM Lima Perú, gracias a nuestros amigos
          de PizzaDAO, quienes realizarán un side event durante uno de los
          eventos más esperados de este 2024
        </p>
      </>
    ),
    stats: (
      <ul>
        <li>
          Fecha: <span className="font-semibold">1 feb - 29 feb de 2024</span>
        </li>
        <li>
          Lugar:{" "}
          <span className="font-semibold">San Salvador, El Salvador</span>
        </li>
        <li>
          Categoría: <span className="font-semibold">Hackathon</span>
        </li>
      </ul>
    ),
  },
];
