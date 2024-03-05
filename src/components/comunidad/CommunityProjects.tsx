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

export function CommunityProjects() {
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
    <div className="flex flex-col items-center space-y-4 px-4 py-2 lg:flex-row lg:items-start lg:justify-center">
      <div className="flex flex-col items-center space-y-2 lg:w-2/5">
        <h2 className={`${nounsFont.className} text-center text-4xl md:hidden`}>
          {projectsArray[current]?.title}
        </h2>
        <Carousel className="w-[87.5%] xs:w-full md:max-w-md" setApi={setApi}>
          <CarouselContent>
            {projectsArray.map((project, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="border-0">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="flex w-full justify-center">
                        <div className="relative w-full">
                          <Image
                            src={
                              project.imageSrc ??
                              "/icons/android-chrome-512x512.png"
                            }
                            alt={
                              project.imageAlt ?? "Image showing the project"
                            }
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="lg:hidden" />
          <CarouselNext className="lg:hidden" />
        </Carousel>
      </div>
      <div className="flex flex-col space-y-1 text-left lg:w-3/5 lg:pl-6 lg:pr-2 lg:pt-4">
        <h3
          className={`${nounsFont.className} hidden text-left text-3xl md:block md:text-4xl`}
        >
          {projectsArray[current]?.title}
        </h3>
        {projectsArray[current]?.content}
        {projectsArray[current]?.stats}
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

const projectsArray: projectElement[] = [
  {
    title: "Nouns Amigos en Lima",
    imageSrc: "/icons/android-chrome-512x512.png",
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
    title: "Proyecto 2",
    imageSrc: "/icons/android-chrome-512x512.png",
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
    title: "Proyecto 3",
    imageSrc: "/icons/android-chrome-512x512.png",
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
    title: "Proyecto 4",
    imageSrc: "/icons/android-chrome-512x512.png",
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
    title: "Proyecto 5",
    imageSrc: "/icons/android-chrome-512x512.png",
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
