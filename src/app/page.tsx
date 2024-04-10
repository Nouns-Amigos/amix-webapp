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
import { ChevronsDown, ArrowLeft } from "lucide-react";
import useAlchemy from "@/services/alchemy";
import {
  // type GetOwnersForContractResponse,
  // type GetOwnersForContractWithTokenBalancesResponse,
  type Nft,
  NftTokenType,
} from "alchemy-sdk";

import { NounsAmigosContractAddress } from "@/config/nounsAmigosCollection";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { getRandomNumber, truncateString } from "@/utils";
import { ProjectsShowcase } from "@/components/landing/ProjectsShowcase";
import { AMIGOS_METADATA } from "amigos/metadata";
import Navbar from "./navbar";
import { zeroAddress } from "viem";
import Link from "next/link";

// type nftElementDataType = {
//   acquiredAt: unknown;
//   collection: {
//     bannerImageUrl: string;
//     externalUrl: string;
//     name: string;
//     slug: string;
//   };
//   contract: {
//     address: string;
//     contractDeployer: string;
//     deployedBlockNumber: number;
//     isSpam: boolean;
//     name: string;
//     openSeaMetadata: {
//       bannerImageUrl: string;
//       collectionName: string;
//       collectionSlug: string;
//       description: string;
//       discordUrl: string;
//       externalUrl: string;
//       floorPrice: number;
//       imageUrl: string;
//       lastIngestedAt: string;
//       safelistRequestStatus: string;
//       twitterUsername: string;
//     };
//     spamClassifications: unknown[];
//     symbol: string;
//     tokenType: string;
//     totalSupply: string | number;
//   };
//   description: string;
//   image: {
//     cachedUrl: string;
//     contentType: string;
//     originalUrl: string;
//     pngUrl: string;
//     size: number;
//     thumbnailUrl: string;
//   };
//   mint: {
//     mintAddress: string;
//     blockNumber: number;
//     timestamp: string;
//     transactionHash: string;
//   };
//   name: string;
//   owners: unknown;
//   raw: {
//     error: unknown;
//     metadata: {
//       created_by: string;
//       description: string;
//       external_url: string;
//       image: string;
//       image_details: {
//         format: string;
//         width: number;
//         sha256: string;
//         bytes: number;
//         height: number;
//       };
//       image_url: string;
//       name: string;
//     };
//     tokenUri: string;
//   };
//   timeLastUpdated: string;
//   tokenId: string;
//   tokenType: string;
//   tokenUri: string;
// };

export default function Home() {
  const [isCollectionFetched, setIsCollectionFetched] = useState(false);
  // const [displayAmigoToken, setDisplayAmigoToken] = useState<
  //   AmigoMetadataType | undefined
  // >(undefined);
  // const warmHexColor = "#E1D7D5";
  // const coolHexColor = "#D5D7E1";
  const [isWarmColor, setIsWarmColor] = useState(true);

  async function getRandomAmigoToken() {
    const randomTokenId = getRandomNumber(AMIGOS_METADATA.length);
    AMIGOS_METADATA[randomTokenId]?.background === "warm"
      ? setIsWarmColor(true)
      : setIsWarmColor(false);
  }

  useEffect(() => {
    if (!isCollectionFetched) {
      void getRandomAmigoToken();
      setIsCollectionFetched(true);
    }
  }, []);

  return (
    <>
      <Navbar color={isWarmColor ? "warm" : "cool"} />
      <Hero isWarmColor={isWarmColor} setIsWarmColor={setIsWarmColor} />
      <WhatIsNounsAmigos />
      <Testimonials />
      <ProjectsShowcase />
      <Faq />
    </>
  );
}

type HeroProps = {
  isWarmColor: boolean;
  setIsWarmColor: Dispatch<SetStateAction<boolean>>;
};

function Hero({ isWarmColor, setIsWarmColor }: HeroProps) {
  const [isCollectionFetched, setIsCollectionFetched] = useState(false);
  const [displayAmigoToken, setDisplayAmigoToken] = useState<Nft | undefined>(
    undefined,
  );
  const [displayAmigoOwner, setDisplayAmigoOwner] = useState<
    string | undefined
  >(undefined);
  const [amigosCollection, setAmigosCollection] = useState<Nft[]>([]);
  // const [amigoHolders, setAmigoHolders] = useState<
  //   GetOwnersForContractWithTokenBalancesResponse | GetOwnersForContractResponse
  // >();
  const alchemy = useAlchemy();

  async function getNftsForAmigosCollection() {
    try {
      const nfts: Nft[] = [];
      // Get the async iterable for the contract's NFTs.
      const nftsIterable = alchemy.nft.getNftsForContractIterator(
        NounsAmigosContractAddress,
      );

      // Iterate over the NFTs and add them to the nfts array.
      for await (const nft of nftsIterable) {
        nfts.push(nft);
      }
      return nfts;
    } catch (error) {
      console.log(error);
    }
  }

  async function getAmigoTokenData(tokenId: number) {
    const amigoOwnerData = await alchemy.nft.getOwnersForNft(
      NounsAmigosContractAddress,
      tokenId,
    );
    const amigoMetadata = await alchemy.nft.getNftMetadata(
      NounsAmigosContractAddress,
      tokenId,
      { tokenType: NftTokenType.ERC721 },
    );
    return { amigoMetadata, amigoOwner: amigoOwnerData.owners[0] };
  }

  async function getAmigoToken(_tokenId: number) {
    let fetchedCollection: Nft[] | undefined = [];
    let tokenId = _tokenId;
    if (isCollectionFetched) {
      fetchedCollection = amigosCollection;
    } else {
      fetchedCollection = await getNftsForAmigosCollection();
      if (!fetchedCollection) return;
      setAmigosCollection(fetchedCollection);
    }
    if (tokenId < 0) {
      tokenId = getRandomNumber(fetchedCollection.length);
    }

    const { amigoMetadata, amigoOwner } = await getAmigoTokenData(tokenId);
    setDisplayAmigoOwner(amigoOwner);
    setDisplayAmigoToken(amigoMetadata);
    setIsWarmColor(AMIGOS_METADATA[tokenId]?.background === "warm");
  }

  useEffect(() => {
    if (!isCollectionFetched) {
      void getAmigoToken(-1);
      // void getCollectionHolders();
      setIsCollectionFetched(true);
    }
  }, []);

  return (
    <div
      className={`${
        isWarmColor ? "bg-[#E1D7D5]" : "bg-[#D5D7E1]"
      } w-full xl:flex xl:justify-center`}
    >
      <div className="flex h-full w-full flex-col-reverse items-center md:items-end lg:w-full lg:flex-row lg:items-center lg:pt-12 xl:max-w-6xl xl:pt-20">
        {/*AMIGO image container*/}
        <div className="flex w-full flex-wrap justify-center md:absolute md:justify-start md:py-0 lg:static lg:h-full lg:w-[47.5%] lg:items-end lg:justify-end lg:pt-10 xl:pt-0">
          {/*AMIGO image*/}
          <div className="flex w-full items-start justify-center md:-ml-8 md:w-[55%] lg:-mr-8 lg:ml-0 lg:w-full">
            <div className="w-full">
              {displayAmigoToken ? (
                <Image
                  src={
                    displayAmigoToken?.image.originalUrl ??
                    "/icons/android-chrome-512x512.png"
                  }
                  alt={`Token Amigo with tokenId ${displayAmigoToken?.tokenId}`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-auto w-full"
                />
              ) : (
                <div className="flex aspect-square w-full flex-col items-center justify-center space-y-3 bg-transparent">
                  <div
                    className="inline-block h-12 w-12 animate-spin rounded-full border-[5px] border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  />
                  <span
                    className={`${nounsFont.className} text-2xl text-foreground`}
                  >
                    Cargando...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/*AMIGO data and scroll-down arrows (sm viewports only)*/}
        <div className="z-10 flex w-full flex-col md:hidden">
          <div className="flex w-full items-center justify-around px-6">
            <div className={`${nounsFont.className} text-[40px]`}>
              Amigo {displayAmigoToken?.tokenId ?? ""}
            </div>
            <div className="flex flex-col text-sm">
              <div className="flex flex-col items-start text-sm">
                <div className="flex space-x-2">
                  <p>Dueño:</p>
                  {displayAmigoOwner ? (
                    <Link
                      href={`https://etherscan.io/address/${displayAmigoOwner}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center font-semibold hover:text-primary"
                    >
                      {truncateString(displayAmigoOwner ?? zeroAddress, 4, 4)}{" "}
                    </Link>
                  ) : (
                    <p>No disponible</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <p>Creado:</p>
                  {displayAmigoToken?.mint?.timestamp ? (
                    <p>
                      {new Date(
                        displayAmigoToken?.mint?.timestamp ?? "No disponible",
                      ).toLocaleDateString("es-ES", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  ) : (
                    <p>No disponible</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Header and subheader*/}
        <div className="z-10 flex h-full w-full flex-col justify-center gap-y-2 px-6 pt-8 md:w-2/3 md:px-8 md:pb-16 md:pt-20 lg:w-[52.5%] lg:items-center lg:px-16 lg:pb-8 lg:pl-0 xl:pb-8 xl:pt-16">
          <Image
            src="/images/landing/globoaz.svg"
            alt="Únete a la comunidad de Nouns en Español"
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-full md:-mt-16"
          />
          <h4
            className={`${nounsFont.className} mt-2 px-4 text-[2rem] font-light leading-none md:px-8 md:text-center lg:px-0`}
          >
            Trae tus ideas y<br /> construye con nosotros
          </h4>
          <div className="w-full px-4 py-4 md:px-20 lg:px-0">
            <hr className="border-[1.5px] border-black" />
          </div>
          <div className="hidden w-full items-center justify-around md:flex md:md:px-6 lg:px-0">
            <div className="hidden items-center lg:flex">
              <Image
                src="/images/arrow.svg"
                alt="Arrow"
                width={0}
                height={0}
                sizes="100vw"
                className="lg:w-18 md:w-16 xl:w-20"
              />
            </div>
            <div className={`${nounsFont.className} text-[40px]`}>
              Amigo {displayAmigoToken?.tokenId}
            </div>
            <div className="flex flex-col items-start text-sm">
              <div className="flex space-x-2">
                <p>Dueño:</p>
                {displayAmigoOwner ? (
                  <Link
                    href={`https://etherscan.io/address/${displayAmigoOwner}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center font-semibold hover:text-primary"
                  >
                    {truncateString(displayAmigoOwner ?? zeroAddress, 4, 4)}{" "}
                  </Link>
                ) : (
                  <p>No disponible</p>
                )}
              </div>
              <div className="flex space-x-2">
                <p>Creado:</p>
                {displayAmigoToken?.mint?.timestamp ? (
                  <p>
                    {new Date(
                      displayAmigoToken?.mint?.timestamp ?? "No disponible",
                    ).toLocaleDateString("es-ES", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                ) : (
                  <p>No disponible</p>
                )}
              </div>
            </div>

            <div className="flex md:flex-col md:space-y-1.5 lg:flex-row lg:space-x-2 lg:space-y-0">
              <Link
                href={`https://opensea.io/assets/ethereum/0x964629a577ebd3d1cc9ce4361bdcc1abb282132f/${displayAmigoToken?.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/logos/opensea-logo.svg"
                  alt="Únete a la comunidad de Nouns en Español"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-6 w-6"
                />
              </Link>
              <Link
                href={`https://etherscan.io/address/0x964629a577ebd3d1cc9ce4361bdcc1abb282132f`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/logos/etherscan-logo.svg"
                  alt="Etherscan link"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-6 w-6"
                />
              </Link>
            </div>
          </div>
          <div className="mt-8 hidden w-full justify-center lg:hidden">
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
      <div className="flex h-full w-full flex-col space-y-4 px-6 py-16 md:px-16 md:py-20 lg:flex-row lg:items-center lg:space-y-0 lg:px-24 lg:py-16 lg:text-center xl:px-48 xl:py-20 2xl:px-52">
        <div className="flex w-full flex-col gap-y-4 lg:w-[52.5%] lg:pl-0">
          <h2
            className={`${nounsFont.className} block text-left text-5xl lg:hidden`}
          >
            Nouns Amigos es para todos
          </h2>
          <div className="aspect-video md:mt-6 lg:mt-0">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/4HI61GT5-dg?si=2EUq3cMGdBQ5k74g"
              title="¿Qué es Nouns?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div className="lg:w-[47.5%] lg:pl-12">
          <h2
            className={`${nounsFont.className} hidden text-left text-5xl lg:block xl:text-6xl`}
          >
            Nouns Amigos <br className="hidden lg:block" />
            es para todos
          </h2>
          <div className="flex flex-col space-y-4">
            <p className="mt-2 text-lg lg:text-left xl:text-xl">
              Nouns Amigos es una marca de uso libre que genera un impacto
              positivo al financiar ideas y fomentar la colaboración entre
              comunidades de habla Hispana. <br /> Desde coleccionistas y
              tecnólogos hasta marcas y organizaciones sin fines de lucro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    body: "Entra a la app, regístrate y cuéntanos el impacto que Nouns Amigos ha tenido para tí",
    author: {
      name: "Contribuye a NounsAmigos.wtf",
      handle: "lesliealexander",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "Necesitarás una cartera Web3 para poder crear tu cuenta y registrar tu testimonio.",
    author: {
      name: "Entra y firma p/iniciar sesión",
      handle: "lesliealexander2",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "Queremos impulsar tu camino onchain, ¡estas interacciones son importantes!",
    author: {
      name: "Nouns DAO Amigos onchain",
      handle: "lesliealexander3",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

function Testimonials() {
  return (
    <div className="bg-[#F8F8F8] px-6 py-16 text-foreground md:px-16 md:py-20 lg:px-24 lg:py-16 xl:px-32">
      <div className="mx-auto max-w-7xl xl:px-16">
        <div className="text-center">
          <h3
            className={`${nounsFont.className} mt-2 text-4xl font-bold leading-relaxed xs:text-4xl lg:text-5xl`}
          >
            ¿Cuál es el impacto de nuestra comunidad?
          </h3>
        </div>
        <div className="max-w-2xl pb-8 pt-12 lg:mx-0 lg:max-w-none">
          <div className="grid grid-rows-1 gap-x-4 sm:grid-cols-2 sm:text-[0] md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author.handle}
                className="py-4 sm:inline-block sm:w-full"
              >
                <figure className="rounded-2xl bg-zinc-200 p-6 leading-6">
                  <figcaption className="flex items-center gap-x-4">
                    <Image
                      className="h-10 w-10 rounded-full bg-gray-50 md:hidden lg:block"
                      src="/icons/android-chrome-512x512.png"
                      alt=""
                      width={10}
                      height={10}
                    />
                    <div className="flex items-center">
                      <div className="text-xl font-semibold text-gray-900">
                        {testimonial.author.name}
                      </div>
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
        <div className="flex flex-col items-center space-y-4 py-4 md:flex-row md:items-center md:justify-center md:space-x-4 md:space-y-0 md:px-4">
          <h4
            className={`${nounsFont.className} text-center text-2xl font-light text-foreground md:text-left lg:text-3xl`}
          >
            Súmate a Nouns Amigos y comienza <br className="hidden lg:block" />a
            construir en Web3 con nosotros
          </h4>
          <p className="hidden md:block md:text-4xl">→</p>
          <Link
            href="https://discord.gg/we3HY9YBfZ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className={`${nounsFont.className} px-6 py-2.5 text-2xl lg:h-14 lg:!py-4 lg:px-8 lg:text-3xl`}
            >
              Únete en Discord
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  return (
    <div className="w-full bg-[#F8F8F8] text-foreground lg:flex lg:justify-center lg:px-24 xl:px-32">
      <div className="flex h-full w-full max-w-7xl flex-col space-y-4 px-6 py-16 md:px-16 md:py-20 lg:flex-row lg:px-0 lg:py-16 lg:text-center xl:px-16">
        <div className="flex w-full flex-col md:items-start lg:flex-row">
          <div className="flex h-full w-full items-start justify-end lg:w-2/5 lg:justify-center">
            <Image
              src="/images/landing/faq-globe-green.png"
              alt="Únete a la comunidad de Nouns en Español"
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-2/3 md:w-1/2 lg:w-5/6"
            />
          </div>
          <div className="flex w-full flex-col gap-y-4 md:pb-8 lg:w-3/5 lg:pt-12">
            <h3
              className={`${nounsFont.className} mt-2 text-4xl leading-tight xs:text-4xl md:text-left lg:hidden`}
            >
              Preguntas Frecuentes
            </h3>
            <p className="text-left text-xl md:w-4/5 lg:w-full">
              Somos la comunidad de Nouns DAO todos los que hablamos español.
              Ayudamos a crear bienes públicos, impacto social, arte, diseño y
              tecnología.
            </p>

            <FaqAccordion />
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full md:w-4/5 md:pt-0 lg:w-full"
    >
      <AccordionItem
        value="item-1"
        className="rounded-lg px-4 py-2 md:px-6 md:py-4 [&[data-state=open]]:bg-[#ebebeb]"
      >
        <AccordionTrigger className="py-0">
          <h4
            className={`${nounsFont.className} text-left text-3xl md:text-4xl`}
          >
            ¿Qué es Nouns?
          </h4>
        </AccordionTrigger>
        <AccordionContent className="pt-2 text-left text-lg">
          <p>
            Nouns es una DAO que se dedica a financiar ideas. Estas ideas pueden
            ir en cualquier dirección que ayude a difundir Nouns de una manera
            positiva en básicamente cualquier categoría que puedas imaginar:
            bienes públicos, impacto social, arte, diseño, tecnología, ciencia,
            música, danza, juguetes, gastronomía, deporte, etc.
          </p>
          <p>
            Para financiar estas ideas se subasta un NFT diariamente. Los fondos
            recaudados de esas subastas se envían directamente a la tesorería de
            la DAO donde los poseedores del NFT pueden decidir cómo utilizar
            esos fondos. Todo este proceso ocurre de una manera descentralizada.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-2"
        className="rounded-lg px-4 py-2 md:px-6 [&[data-state=open]]:bg-[#ebebeb]"
      >
        <AccordionTrigger className="py-0">
          <h4
            className={`${nounsFont.className} text-left text-3xl md:text-4xl`}
          >
            ¿Qué es Prop House?
          </h4>
        </AccordionTrigger>
        <AccordionContent className="pt-2 text-left text-lg">
          <p>
            Prop House es una infraestructura pública financiada por Nouns DAO.
            Es un enfoque experimental para que las comunidades distribuyan
            capital. Mediante rondas de financiamiento, las comunidades subastan
            cantidades fijas de capital a los creadores con las mejores ideas.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-3"
        className="rounded-lg px-4 py-2 md:px-6 md:py-4 [&[data-state=open]]:bg-[#ebebeb]"
      >
        <AccordionTrigger className="py-0">
          <h4
            className={`${nounsFont.className} text-left text-3xl md:text-4xl`}
          >
            ¿Cómo funciona Prop House?
          </h4>
        </AccordionTrigger>
        <AccordionContent className="pt-2 text-left text-lg">
          <p>
            Las comunidades realizan rondas de financiamiento en sus casas
            comunitarias. En estas rondas, los creadores pueden proponer ideas
            para ser financiadas. El flujo es el siguiente:
          </p>
          <ol className="list-inside list-decimal pt-2">
            <li>
              Una comunidad propone una ronda de financiamiento. Cada ronda
              tiene una cantidad fija de capital a ganar (por ejemplo, 3
              ganadores obtienen 1 ETH cada uno) y se compone de un periodo de
              propuesta y otro de votación.
            </li>
            <li>
              Comienza el periodo de propuestas. Los creadores pueden proponer
              ideas para las cuales les gustaría obtener fondos.
            </li>
            <li>
              Finaliza el periodo de propuestas y comienza el periodo de
              votaciones. Los poseedores de tokens de la comunidad votan sus
              propuestas favoritas.
            </li>
            <li>
              Finaliza el periodo de votación. ¡Las mejores propuestas obtienen
              fondos!
            </li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-4"
        className="rounded-lg px-4 py-2 md:px-6 md:py-4 [&[data-state=open]]:bg-[#ebebeb]"
      >
        <AccordionTrigger className="py-0">
          <h4
            className={`${nounsFont.className} text-left text-3xl md:text-4xl`}
          >
            ¿Qué es una propuesta?
          </h4>
        </AccordionTrigger>
        <AccordionContent className="pt-2 text-left text-lg">
          <p>
            Una propuesta es una idea articulada que se presenta en una ronda de
            financiamiento para que sea votada por la comunidad por la
            posibilidad de obtener ese financiamiento.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-5"
        className="rounded-lg px-4 py-2 md:px-6 md:py-4 [&[data-state=open]]:bg-[#ebebeb]"
      >
        <AccordionTrigger className="py-0">
          <h4
            className={`${nounsFont.className} text-left text-3xl md:text-4xl`}
          >
            ¿Quién puede enviar propuestas?
          </h4>
        </AccordionTrigger>
        <AccordionContent className="pt-2 text-left text-lg">
          <p>
            Cualquier persona con una dirección de Ethereum puede enviar una
            propuesta a cualquier ronda de financiamiento.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-6"
        className="rounded-lg px-4 py-2 md:px-6 md:py-4 [&[data-state=open]]:bg-[#ebebeb]"
      >
        <AccordionTrigger className="py-0">
          <h4
            className={`${nounsFont.className} text-left text-3xl md:text-4xl`}
          >
            ¿Qué se obtiene al ganar una ronda?
          </h4>
        </AccordionTrigger>
        <AccordionContent className="pt-2 text-left text-lg">
          <p>
            Al ganar una ronda de financiamiento de Nouns Amigos obtendrás el
            monto indicado en ETH en cada ronda. Adicionalmente del monto,
            obtendrás el token de Nouns Amigos. A continuación, se espera que
            ejecutes la idea que has propuesto. Asegúrate de solicitar el apoyo
            de la comunidad Nouns Amigos.
          </p>
          <p>
            Nota: animamos a los creadores a construir en público, a través de
            ser activos en redes sociales, para crecer su reputación. En este
            nuevo mundo, ¡una buena reputación vale su peso en oro!
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-7"
        className="rounded-lg px-4 py-2 md:px-6 md:py-4 [&[data-state=open]]:bg-[#ebebeb]"
      >
        <AccordionTrigger className="py-0">
          <h4
            className={`${nounsFont.className} text-left text-3xl md:text-4xl`}
          >
            ¿Quién puede votar por las propuestas de la Casa Nouns Amigos?
          </h4>
        </AccordionTrigger>
        <AccordionContent className="pt-2 text-left text-lg">
          <p>Pueden votar poseedores del token de Nouns Amigos.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-8"
        className="rounded-lg px-4 py-2 md:px-6 md:py-4 [&[data-state=open]]:bg-[#ebebeb]"
      >
        <AccordionTrigger className="py-0">
          <h4
            className={`${nounsFont.className} text-left text-3xl md:text-4xl`}
          >
            ¿Cómo funciona y cómo se obtiene el token de NounsAmigos?
          </h4>
        </AccordionTrigger>
        <AccordionContent className="pt-2 text-left text-lg">
          <p>
            A diferencia de otros proyectos y DAOs, no hay una venta o subasta
            de tokens. El token de Nouns amigos se puede obtener al ganar una
            ronda de financiamiento. De esta manera queremos incentivar a
            creadores a que propongan ideas para obtener financiamiento y el
            token.
          </p>
          <p>
            Por lo mismo, se creará (mint) un nuevo token (NFT) por cada
            propuesta ganadora al finalizar cada ronda de financiamiento. No
            será necesario comprarlo ya que se obtendrá al ganar una ronda.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
