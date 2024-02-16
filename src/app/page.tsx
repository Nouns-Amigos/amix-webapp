"use client";

import Image from "next/image";

import { nounsFont } from "@/lib/fonts";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CornerLeftDown, ChevronsDown, ArrowLeft } from "lucide-react";
import useAlchemy from "@/services/alchemy";

import { NounsAmigosContractAddress } from "@/config/nounsAmigosCollection";
import { useEffect, useState } from "react";
import { NftTokenType } from "alchemy-sdk";
import { ProjectsCarousel } from "@/components/landing/ProjectsCarousel";

type nftElementDataType = {
  acquiredAt: unknown;
  collection: {
    bannerImageUrl: string;
    externalUrl: string;
    name: string;
    slug: string;
  };
  contract: {
    address: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    isSpam: boolean;
    name: string;
    openSeaMetadata: {
      bannerImageUrl: string;
      collectionName: string;
      collectionSlug: string;
      description: string;
      discordUrl: string;
      externalUrl: string;
      floorPrice: number;
      imageUrl: string;
      lastIngestedAt: string;
      safelistRequestStatus: string;
      twitterUsername: string;
    };
    spamClassifications: unknown[];
    symbol: string;
    tokenType: string;
    totalSupply: string | number;
  };
  description: string;
  image: {
    cachedUrl: string;
    contentType: string;
    originalUrl: string;
    pngUrl: string;
    size: number;
    thumbnailUrl: string;
  };
  mint: {
    mintAddress: string;
    blockNumber: number;
    timestamp: string;
    transactionHash: string;
  };
  name: string;
  owners: unknown;
  raw: {
    error: unknown;
    metadata: {
      created_by: string;
      description: string;
      external_url: string;
      image: string;
      image_details: {
        format: string;
        width: number;
        sha256: string;
        bytes: number;
        height: number;
      };
      image_url: string;
      name: string;
    };
    tokenUri: string;
  };
  timeLastUpdated: string;
  tokenId: string;
  tokenType: string;
  tokenUri: string;
};

function getRandomNumber(range: number) {
  return Math.floor(Math.random() * range);
}

export default function Home() {
  const [isCollectionFetched, setIsCollectionFetched] = useState(false);
  const [displayAmigoToken, setDisplayAmigoToken] =
    useState<unknown>(undefined);
  const [amigosCollection, setAmigosCollection] = useState<
    nftElementDataType[]
  >([]);
  const alchemy = useAlchemy();

  async function getNftsForAmigosCollection() {
    try {
      const nfts = [];
      // Get the async iterable for the contract's NFTs.
      const nftsIterable = alchemy.nft.getNftsForContractIterator(
        NounsAmigosContractAddress,
      );

      // Iterate over the NFTs and add them to the nfts array.
      for await (const nft of nftsIterable) {
        nfts.push(nft as nftElementDataType);
      }

      // Log the NFTs.
      console.log(nfts);
      return nfts;
    } catch (error) {
      console.log(error);
    }
  }

  async function getRandomAmigoToken() {
    const fetchedCollection = await getNftsForAmigosCollection();
    if (!fetchedCollection) return;
    setAmigosCollection(fetchedCollection);
    const randomTokenId = getRandomNumber(fetchedCollection.length);
    const selectedAmigoMetadata = await alchemy.nft.getNftMetadata(
      NounsAmigosContractAddress,
      randomTokenId,
      { tokenType: NftTokenType.ERC721 },
    );
    console.log(selectedAmigoMetadata);
  }

  useEffect(() => {
    if (!isCollectionFetched) {
      void getRandomAmigoToken();
      setIsCollectionFetched(true);
    }
  }, []);

  return (
    <>
      <Hero />
      <WhatIsNounsAmigos />
      <ProjectsShowcase />
      <Testimonials />
      <Faq />
    </>
  );
}

function Hero() {
  return (
    <div className="xl:flex xl:justify-center">
      <div className="flex h-full w-full flex-col-reverse items-center md:h-[calc(100svh-64px)] lg:flex-row xl:max-w-6xl">
        <div className="flex w-full flex-col pb-8 md:hidden">
          <div className="flex w-full items-center justify-around">
            <div className={`${nounsFont.className} text-[40px]`}>Amigo 52</div>
            <div className="flex flex-col text-sm">
              <p>Propietario: Nouns Amigos</p>
              <p>Propuestas: 0</p>
              <p>Mejor oferta: Ξ 0.069</p>
            </div>
          </div>
          <div className="flex justify-center">
            <a href="#what-is-nouns-amigos">
              <Button
                variant="ghost"
                className="border-none px-0 pb-0 pt-4 text-primary hover:bg-transparent hover:text-primary"
              >
                <ChevronsDown className="h-12 w-12" />
              </Button>
            </a>
          </div>
        </div>

        <div className="flex w-full flex-wrap justify-center py-4 md:pb-0 lg:w-1/2">
          <div className="flex w-full justify-center md:w-3/5 lg:bottom-0 lg:h-[100vh] lg:w-full">
            <div className="relative -z-10 h-72 w-72 xs:h-96 xs:w-96 md:h-[416px] md:w-[416px] lg:absolute lg:bottom-0 lg:h-[576px] lg:w-[576px] xl:h-[640px] xl:w-[640px]">
              <Image
                src="/icons/android-chrome-512x512.png"
                alt="AMIGO token #1: a burro with noggles wearing a red shirt that says 'hola'"
                fill
              />
            </div>
          </div>
          <div className="hidden w-full items-start justify-center md:flex md:w-2/5 md:flex-col lg:hidden">
            <div className="flex items-center space-x-4">
              <ArrowLeft className="h-12 w-12" />
              <div className={`${nounsFont.className} text-[40px]`}>
                Amigo 52
              </div>
            </div>

            <div className="flex flex-col text-lg">
              <p>Propietario: Nouns Amigos</p>
              <p>Propuestas: 0</p>
              <p>Mejor oferta: Ξ 0.069</p>
            </div>
          </div>
          <div className="hidden w-full justify-center py-8 md:flex lg:hidden">
            <a href="#what-is-nouns-amigos">
              <Button
                variant="ghost"
                className="border-none px-0 py-1 pb-0 text-primary hover:bg-transparent hover:text-primary"
              >
                <ChevronsDown className="h-12 w-12" />
              </Button>
            </a>
          </div>
        </div>
        <div className="flex h-full flex-col justify-center gap-y-2 px-4 pt-8 md:w-3/4 md:max-w-xl md:gap-y-3 md:px-8 md:pt-20 lg:mb-24 lg:w-1/2 lg:max-w-2xl lg:pl-0 lg:pr-16 lg:pt-0 lg:text-center xl:pt-20">
          <h1
            className={`${nounsFont.className} px-2 text-left text-4xl font-light uppercase text-primary xs:text-5xl md:text-center md:text-6xl lg:text-left`}
          >
            Únete a la comunidad de Nouns en español
          </h1>
          <h4
            className={`${nounsFont.className} mt-2 px-4 text-[2rem] font-light leading-none md:text-center`}
          >
            Trae tus ideas
            <br className="hidden lg:block" /> y construye con nosotros
          </h4>
          <div className="hidden p-4 lg:block">
            <hr className="border-black" />
          </div>
          <div className="hidden w-full items-center justify-around lg:flex">
            <div className="hidden items-center lg:flex">
              <ArrowLeft className="h-12 w-12" />
            </div>
            <div className={`${nounsFont.className} text-[40px]`}>Amigo 52</div>
            <div className="flex flex-col items-start text-sm">
              <p>Propietario: Nouns Amigos</p>
              <p>Propuestas: 0</p>
              <p>Mejor oferta: Ξ 0.069</p>
            </div>
          </div>
          <div className="mt-8 hidden w-full justify-center lg:flex">
            <a href="#what-is-nouns-amigos">
              <Button
                variant="ghost"
                className="border-none px-0 py-1 pb-0 text-primary hover:bg-transparent hover:text-primary"
              >
                <ChevronsDown className="h-12 w-12" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatIsNounsAmigos() {
  return (
    <div
      id="what-is-nouns-amigos"
      className="w-full bg-[#EBEBEB] text-foreground lg:flex lg:justify-center"
    >
      <div className="flex h-full flex-col space-y-4 px-6 py-16 md:px-16 md:py-20 lg:max-w-3xl lg:text-center xl:py-20">
        <div>
          <h2
            className={`${nounsFont.className} text-left text-5xl md:text-center`}
          >
            Nouns Amigos es para todos
          </h2>
        </div>
        <div className="flex flex-col space-y-4 px-4">
          <p className="mt-2 text-lg md:text-xl lg:text-left">
            Nouns Amigos es una marca de uso libre que genera un impacto
            positivo al financiar ideas y fomentar la colaboración entre
            comunidades de habla Hispana. <br /> Desde coleccionistas y
            tecnólogos hasta marcas y organizaciones sin fines de lucro...
          </p>
          <h4
            className={`${nounsFont.className} text-center text-3xl font-light uppercase`}
          >
            ¡Nouns Amigos <br className="md:hidden" />
            es para todos!
          </h4>
        </div>
        <div className="flex w-full flex-col gap-y-4">
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
      </div>
    </div>
  );
}

function ProjectsShowcase() {
  return (
    <div className="w-full bg-[#FFFFFF] text-foreground lg:flex lg:justify-center">
      <div className="flex h-full flex-col space-y-4 px-6 py-16 md:px-16 md:py-20 lg:max-w-3xl lg:py-12 lg:text-center xl:py-20">
        <div>
          <h3 className={`${nounsFont.className} px-4 text-left text-4xl`}>
            Construye con nosotros y haz realidad tu proyecto
          </h3>
        </div>
        <div className="flex flex-col space-y-4 md:space-y-8 md:px-4">
          <p className="mt-2 text-lg md:text-xl lg:text-left">
            Desde meet-ups, construir unos Noggles gigantes en Japón, o crear
            proyectos tecnológicos,{" "}
            <span className="font-bold">
              en Nouns Amigos DAO apoyamos proyectos de todos los tamaños.
            </span>
          </p>
          <h5
            className={`${nounsFont.className} text-center text-2xl font-light lg:hidden`}
          >
            Algunos proyectos fondeados <br />
            <span className="font-extrabold">↓</span>
          </h5>
        </div>
        <ProjectsCarousel />
      </div>
    </div>
  );
}

const testimonials = [
  {
    body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
    author: {
      name: "Leslie Alexander",
      handle: "lesliealexander",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
    author: {
      name: "Leslie Alexander",
      handle: "lesliealexander2",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
    author: {
      name: "Leslie Alexander",
      handle: "lesliealexander3",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
    author: {
      name: "Leslie Alexander",
      handle: "lesliealexander4",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
    author: {
      name: "Leslie Alexander",
      handle: "lesliealexander5",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
    author: {
      name: "Leslie Alexander",
      handle: "lesliealexander6",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More testimonials...
];

function Testimonials() {
  return (
    <div className="bg-[#EBEBEB] py-16 text-foreground md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h3
            className={`${nounsFont.className} mt-2 text-4xl font-bold leading-relaxed xs:text-4xl lg:text-5xl`}
          >
            ¿Cuál es el{" "}
            <span className="font-bold underline decoration-primary decoration-4 underline-offset-4">
              impacto
            </span>{" "}
            de nuestra comunidad?
          </h3>
        </div>
        <div className="mx-auto flow-root max-w-2xl pb-8 pt-12 lg:mx-0 lg:max-w-none">
          <div className="sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author.handle}
                className="py-4 sm:inline-block sm:w-full sm:px-4"
              >
                <figure className="rounded-2xl bg-gray-50 p-6 leading-6">
                  <figcaption className="flex items-center gap-x-4">
                    <img
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.author.imageUrl}
                      alt=""
                    />
                    <div>
                      <div className="text-xl font-semibold text-gray-900">
                        {testimonial.author.name}
                      </div>
                      <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                    </div>
                  </figcaption>
                  <blockquote className="py-2 text-lg text-gray-900">
                    <p>{`“${testimonial.body}”`}</p>
                  </blockquote>
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 py-4 md:px-8">
          <h4
            className={`${nounsFont.className} text-center text-3xl font-light text-primary`}
          >
            Súmate a Nouns Amigos y comienza <br className="hidden lg:block" />a
            construir en Web3 con nosotros
          </h4>
          <Button size="lg">Únete a nuestro servidor Discord</Button>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  return (
    <div className="bg-[#FFFFFF] md:flex md:justify-center">
      <div className="px-6 pb-8 pt-16 md:flex md:w-3/4 md:flex-col md:px-16 lg:px-32">
        <h3
          className={`${nounsFont.className} mt-2 text-4xl leading-tight xs:text-4xl md:text-left lg:text-5xl`}
        >
          Preguntas Frecuentes
        </h3>
        <div className="w-full px-4 md:flex md:justify-center">
          <Accordion type="single" collapsible className="w-4/5 py-4 md:w-full">
            <AccordionItem value="item-1" className="">
              <AccordionTrigger className="py-2">
                <h4 className={`${nounsFont.className} text-3xl`}>
                  Pregunta 1
                </h4>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero molestias, possimus illo minima, eligendi hic officia,
                  dignissimos doloribus nesciunt quasi ratione veritatis soluta
                  nostrum modi natus voluptas illum voluptatibus eveniet!
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="py-2">
                <h4 className={`${nounsFont.className} text-3xl`}>
                  Pregunta 2
                </h4>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero molestias, possimus illo minima, eligendi hic officia,
                  dignissimos doloribus nesciunt quasi ratione veritatis soluta
                  nostrum modi natus voluptas illum voluptatibus eveniet!
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="py-2">
                <h4 className={`${nounsFont.className} text-3xl`}>
                  Pregunta 3
                </h4>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero molestias, possimus illo minima, eligendi hic officia,
                  dignissimos doloribus nesciunt quasi ratione veritatis soluta
                  nostrum modi natus voluptas illum voluptatibus eveniet!
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="">
              <AccordionTrigger className="py-2">
                <h4 className={`${nounsFont.className} text-3xl`}>
                  Pregunta 4
                </h4>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero molestias, possimus illo minima, eligendi hic officia,
                  dignissimos doloribus nesciunt quasi ratione veritatis soluta
                  nostrum modi natus voluptas illum voluptatibus eveniet!
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="py-2">
                <h4 className={`${nounsFont.className} text-3xl`}>
                  Pregunta 5
                </h4>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero molestias, possimus illo minima, eligendi hic officia,
                  dignissimos doloribus nesciunt quasi ratione veritatis soluta
                  nostrum modi natus voluptas illum voluptatibus eveniet!
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="py-2">
                <h4 className={`${nounsFont.className} text-3xl`}>
                  Pregunta 6
                </h4>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero molestias, possimus illo minima, eligendi hic officia,
                  dignissimos doloribus nesciunt quasi ratione veritatis soluta
                  nostrum modi natus voluptas illum voluptatibus eveniet!
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
