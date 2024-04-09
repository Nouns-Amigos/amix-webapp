"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useAlchemy from "@/services/alchemy";
import {
  type GetOwnersForContractResponse,
  type GetOwnersForContractWithTokenBalancesResponse,
  type Nft,
  NftTokenType,
} from "alchemy-sdk";
import { getRandomNumber, truncateString } from "@/utils";
import { nounsFont } from "@/lib/fonts";
import { zeroAddress } from "viem";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AMIGOS_METADATA } from "amigos/metadata";
import Navbar from "../navbar";

const NounsAmigosContractAddress =
  process.env.NEXT_PUBLIC_NOUNS_AMIGOS_CONTRACT_ADDRESS ??
  "0x964629a577ebD3d1cc9ce4361BDcc1ABb282132F";

export default function AmigoToken() {
  const [isWarmColor, setIsWarmColor] = useState(true);
  const [isCollectionFetched, setIsCollectionFetched] = useState(false);
  const [displayAmigoToken, setDisplayAmigoToken] = useState<Nft | undefined>(
    undefined,
  );
  const [displayAmigoOwner, setDisplayAmigoOwner] = useState<
    string | undefined
  >(undefined);
  const [amigosCollection, setAmigosCollection] = useState<Nft[]>([]);
  const [amigoHolders, setAmigoHolders] = useState<
    GetOwnersForContractWithTokenBalancesResponse | GetOwnersForContractResponse
  >();
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
    AMIGOS_METADATA[tokenId]?.background === "warm"
      ? setIsWarmColor(true)
      : setIsWarmColor(false);
  }

  async function getCollectionHolders() {
    const holders = await alchemy.nft.getOwnersForContract(
      NounsAmigosContractAddress,
      { withTokenBalances: true, includeCount: true },
    );
    setAmigoHolders(holders);
  }

  const Gallery = useCallback(
    () => AmigoGallery({ amigosCollection, amigoHolders, getAmigoToken }),
    [],
  );

  useEffect(() => {
    if (!isCollectionFetched) {
      void getAmigoToken(-1);
      void getCollectionHolders();
      setIsCollectionFetched(true);
    }
  }, []);

  return (
    <>
      <Navbar color={isWarmColor ? "warm" : "cool"} />
      <div
        className={`flex w-full flex-col items-center text-foreground ${
          isWarmColor ? "bg-warmBgNouns" : "bg-coolBgNouns"
        }`}
      >
        <div className="flex h-full w-full flex-col items-end md:relative md:px-8 lg:w-4/5 xl:max-w-6xl">
          <div className="w-full pt-12 md:flex md:pt-16 lg:pt-20 xl:pt-24">
            <div className="flex w-full items-end md:w-1/2">
              {displayAmigoToken ? (
                <div className="flex aspect-square w-full justify-center">
                  <div className="relative w-full">
                    <Image
                      src={displayAmigoToken.image.originalUrl!}
                      alt={`Token Amigo with tokenId ${amigosCollection[
                        amigosCollection.length - 1
                      ]?.tokenId}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
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
            <div className="flex w-full flex-col space-y-2 p-4 md:w-1/2 xl:pb-0">
              <div className="flex w-full justify-start space-x-8 md:justify-between md:space-x-0 lg:justify-start lg:space-x-8">
                {/* <Button
                  className="md:px-2"
                  variant="ghost"
                  onClick={() =>
                    parseInt(displayAmigoToken?.tokenId ?? "1") > 1 &&
                    getAmigoToken(
                      parseInt(displayAmigoToken?.tokenId ?? "2") - 1,
                    )
                  }
                >
                  <ChevronLeftIcon className="h-8 w-8" />
                </Button> */}
                <h1
                  className={`${nounsFont.className} hidden text-5xl md:block lg:hidden`}
                >
                  Amigo {displayAmigoToken?.tokenId}
                </h1>
                {/* <Button className="md:px-2" variant="ghost">
                  <ChevronRightIcon
                    className="h-8 w-8"
                    onClick={() =>
                      parseInt(displayAmigoToken?.tokenId ?? "1") <
                        amigosCollection.length &&
                      getAmigoToken(
                        parseInt(displayAmigoToken?.tokenId ?? "2") + 1,
                      )
                    }
                  />
                </Button> */}
              </div>
              <div className="w-full md:px-4">
                <div className="flex w-full items-center justify-between">
                  <button
                    className="md:absolute md:left-0 md:top-1/2 lg:-ml-16"
                    onClick={() =>
                      parseInt(displayAmigoToken?.tokenId ?? "1") > 1 &&
                      getAmigoToken(
                        parseInt(displayAmigoToken?.tokenId ?? "2") - 1,
                      )
                    }
                  >
                    <Image
                      src="/images/arrow.svg"
                      alt="Arrow"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-16"
                    />
                  </button>
                  <h1
                    className={`${nounsFont.className} text-6xl md:hidden lg:block`}
                  >
                    Amigo {displayAmigoToken?.tokenId}
                  </h1>
                  <button
                    className="md:absolute md:right-0 md:top-1/2 lg:-mr-16"
                    onClick={() =>
                      parseInt(displayAmigoToken?.tokenId ?? "1") <
                        amigosCollection.length &&
                      getAmigoToken(
                        parseInt(displayAmigoToken?.tokenId ?? "2") + 1,
                      )
                    }
                  >
                    <Image
                      src="/images/arrow.svg"
                      alt="Arrow"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-16 scale-x-[-1]"
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between px-4 pt-2 text-xl md:px-6 md:text-base">
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
                <div className="flex items-center justify-between px-4 pt-2 text-xl md:px-6 md:text-base">
                  <p>Dueño:</p>
                  {displayAmigoOwner ? (
                    <Link
                      href={`https://etherscan.io/address/${displayAmigoOwner}`}
                      className="flex items-center text-xl font-medium text-primary md:text-lg"
                    >
                      {truncateString(displayAmigoOwner ?? zeroAddress, 4, 4)}
                    </Link>
                  ) : (
                    <p>No disponible</p>
                  )}
                </div>
                <div className="flex w-full justify-end gap-x-2 px-4 pt-2 md:px-6 lg:flex-row lg:gap-y-0">
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
                <div className="flex items-center justify-between px-4 md:px-0 lg:px-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full md:hidden"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="py-2">
                        <h3
                          className={`${nounsFont.className} text-3xl md:text-3xl`}
                        >
                          Atributos
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent className="text-xl md:pb-0 md:text-lg">
                        <div className="pl-4">
                          <ul className="list-inside list-[square] marker:text-primary">
                            <li>
                              Noggles:{" "}
                              {displayAmigoToken
                                ? AMIGOS_METADATA[
                                    parseInt(displayAmigoToken.tokenId)
                                  ]?.glasses
                                : "cargando..."}
                            </li>
                            <li>
                              Cabeza:{" "}
                              {displayAmigoToken
                                ? AMIGOS_METADATA[
                                    parseInt(displayAmigoToken.tokenId)
                                  ]?.head
                                : "cargando..."}
                            </li>
                            <li>
                              Accesorio:{" "}
                              {displayAmigoToken
                                ? AMIGOS_METADATA[
                                    parseInt(displayAmigoToken.tokenId)
                                  ]?.accesory
                                : "cargando..."}
                            </li>
                            <li>
                              Cuerpo:{" "}
                              {displayAmigoToken
                                ? AMIGOS_METADATA[
                                    parseInt(displayAmigoToken.tokenId)
                                  ]?.body
                                : "cargando..."}
                            </li>
                            <li>
                              Fondo:{" "}
                              {displayAmigoToken
                                ? AMIGOS_METADATA[
                                    parseInt(displayAmigoToken.tokenId)
                                  ]?.background
                                : "cargando..."}
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="hidden md:flex md:w-full md:flex-col">
                    <h3
                      className={`${nounsFont.className} py-2 text-2xl md:text-3xl`}
                    >
                      Atributos
                    </h3>
                    <div className="pl-4 text-xl md:pb-0 md:text-lg">
                      <ul className="list-inside list-[square] marker:text-primary">
                        <li>
                          Noggles:{" "}
                          {displayAmigoToken
                            ? AMIGOS_METADATA[
                                parseInt(displayAmigoToken.tokenId)
                              ]?.glasses
                            : "cargando..."}
                        </li>
                        <li>
                          Cabeza:{" "}
                          {displayAmigoToken
                            ? AMIGOS_METADATA[
                                parseInt(displayAmigoToken.tokenId)
                              ]?.head
                            : "cargando..."}
                        </li>
                        <li>
                          Accesorio:{" "}
                          {displayAmigoToken
                            ? AMIGOS_METADATA[
                                parseInt(displayAmigoToken.tokenId)
                              ]?.accesory
                            : "cargando..."}
                        </li>
                        <li>
                          Cuerpo:{" "}
                          {displayAmigoToken
                            ? AMIGOS_METADATA[
                                parseInt(displayAmigoToken.tokenId)
                              ]?.body
                            : "cargando..."}
                        </li>
                        <li>
                          Fondo:{" "}
                          {displayAmigoToken
                            ? AMIGOS_METADATA[
                                parseInt(displayAmigoToken.tokenId)
                              ]?.background
                            : "cargando..."}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center bg-[#F8F8F8] px-6 text-foreground lg:flex-row lg:justify-center lg:space-x-8 lg:px-32 xl:px-48">
          <div className="flex w-full flex-col items-center space-y-2 py-12 md:w-3/4 md:py-16 lg:w-full xl:pt-20">
            <h2
              className={`${nounsFont.className} pb-4 text-center text-4xl md:text-5xl`}
            >
              Colección Nouns DAO Amigos
            </h2>
            {/* Stats grid */}
            <div className="grid w-full grid-cols-1 gap-y-4 px-8 py-4 md:grid-cols-3 md:gap-x-4 md:px-0">
              <Card className="border-0">
                <CardHeader className="!pb-0 text-redNoggles">
                  <CardTitle
                    className={`${nounsFont.className} text-center text-5xl font-medium`}
                  >
                    {amigosCollection.length > 0 ? (
                      <span>{amigosCollection.length}</span>
                    ) : (
                      <div
                        className="-mt-2 inline-block h-8 w-8 animate-spin rounded-full border-[4px] border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-xl font-semibold md:text-2xl">
                    Tokens creados
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0">
                <CardHeader className="!pb-0 text-redNoggles">
                  <CardTitle
                    className={`${nounsFont.className} text-center text-5xl font-medium`}
                  >
                    {amigoHolders ? (
                      <span>{amigoHolders.owners.length}</span>
                    ) : (
                      <div
                        className="-mt-2 inline-block h-8 w-8 animate-spin rounded-full border-[4px] border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-xl font-semibold md:text-2xl">
                    Holders AMIGO
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0">
                <CardHeader className="!pb-0 text-redNoggles">
                  <CardTitle
                    className={`${nounsFont.className} text-center text-5xl font-medium`}
                  >
                    58 Ξ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-xl font-semibold md:text-2xl">
                    ETH Distribuido
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="md:space-around lg:space-between flex flex-col items-center gap-y-2 pb-4 pt-8 text-lg md:flex-row md:gap-x-2 lg:w-full lg:justify-center lg:gap-x-8">
              <p>
                ¿Qué puedes hacer
                <br className="hidden lg:block" /> con tu Noun Amigo?
              </p>
              <Image
                src="/images/arrow.svg"
                alt="Arrow"
                width={0}
                height={0}
                sizes="100vw"
                className="w-16 rotate-90 scale-x-[-1] md:rotate-0"
              />
              {/* <p className="text-3xl font-bold md:hidden">↓</p> */}
              {/* <p className="hidden text-3xl font-bold md:block">→</p> */}
              <p className="font-bold">
                Votar en las rondas
                <br className="hidden lg:block" /> de Nouns Amigos
              </p>

              <Image
                src="/images/arrow.svg"
                alt="Arrow"
                width={0}
                height={0}
                sizes="100vw"
                className="w-16 rotate-90 scale-x-[-1] md:rotate-0"
              />
              {/* <p className="text-3xl font-bold md:hidden">↓</p> */}

              {/* <p className="hidden text-3xl font-bold md:block">→</p> */}
              <p className="font-bold">
                Votar en las rondas
                <br className="hidden lg:block" /> de Nouns DAO
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center bg-background px-6 text-foreground lg:flex-row lg:justify-center lg:space-x-8 lg:px-32 xl:px-48">
          <div className="flex w-full flex-col items-center space-y-2 py-12 md:w-3/4 md:py-16 lg:w-full xl:pt-20">
            <div className="w-full text-center">
              <h2
                className={`${nounsFont.className} pb-4 text-center text-4xl md:text-5xl`}
              >
                Galería
              </h2>
            </div>
            {isCollectionFetched && (
              <div className="py-6">
                <AmigoGallery
                  amigosCollection={amigosCollection}
                  amigoHolders={amigoHolders}
                  getAmigoToken={getAmigoToken}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function AmigoUtilitySection() {
  return (
    <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
      <Card className="border-[3px] border-secondary">
        <CardHeader>
          <CardTitle>Votación rondas Nouns Amigos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Distinctio, repellat molestiae. Sapiente, voluptatem. Expedita sed
            nostrum a excepturi iure repudiandae! Atque voluptate laboriosam
            culpa, quisquam id voluptatum! Quasi, possimus et!
          </p>
        </CardContent>
      </Card>
      <Card className="border-[3px] border-secondary">
        <CardHeader>
          <CardTitle>Votación delegada Nouns DAO</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Distinctio, repellat molestiae. Sapiente, voluptatem. Expedita sed
            nostrum a excepturi iure repudiandae! Atque voluptate laboriosam
            culpa, quisquam id voluptatum! Quasi, possimus et!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function AmigoGallery({
  amigosCollection,
  getAmigoToken,
  amigoHolders,
}: {
  amigosCollection: Nft[];
  getAmigoToken: (_tokenId: number) => Promise<void>;
  amigoHolders:
    | GetOwnersForContractWithTokenBalancesResponse
    | GetOwnersForContractResponse
    | undefined;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
      {amigosCollection
        .sort(() => Math.random() - 0.5)
        .map((amigoToken) => (
          <div
            className="amigoCard amigo-Slide-up rounded-lg hover:cursor-pointer hover:border-[3px] hover:border-primary"
            key={`amigo-token-${amigoToken.tokenId}`}
          >
            {/* <div className="flex aspect-square w-full justify-center"> */}
            <Image
              src={amigoToken.image.originalUrl!}
              alt={`Token Amigo with tokenId ${amigosCollection[
                amigosCollection.length - 1
              ]?.tokenId}`}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full "
            />
            <div className="amigoCaption flex flex-col gap-y-0 bg-primary p-2 text-white">
              <div className="flex items-center justify-between">
                <p className={`${nounsFont.className}`}>
                  Amigo {amigoToken.tokenId}
                </p>
                <div className="flex gap-x-2">
                  <Link
                    href={`https://opensea.io/assets/ethereum/0x964629a577ebd3d1cc9ce4361bdcc1abb282132f/${amigoToken?.tokenId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-10"
                  >
                    <Image
                      src="/logos/opensea-logo-white.svg"
                      alt="Únete a la comunidad de Nouns en Español"
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="h-4 w-4"
                    />
                  </Link>
                  {/* <Link
                    href={`https://etherscan.io/address/0x964629a577ebd3d1cc9ce4361bdcc1abb282132f`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/logos/etherscan-logo-white.svg"
                      alt="Etherscan link"
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="h-4 w-4"
                    />
                  </Link> */}
                </div>
              </div>
              {/* <div className="flex items-center justify-between text-xs md:text-base">
                <p className="text-[12px]">Creado:</p>
                {amigoToken.mint?.timestamp ? (
                  <p className="text-[8px]">
                    {new Date(
                      amigoToken.mint?.timestamp ?? "No disponible",
                    ).toLocaleDateString("es-ES", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                ) : (
                  <p className="text-[12px]">No disponible</p>
                )}
              </div> */}
              <div className="flex items-center justify-between text-xs md:text-base">
                <p className="text-[10px] md:text-[12px]">Dueño:</p>
                <Link
                  href={`https://etherscan.io/address/${AMIGOS_METADATA[
                    parseInt(amigoToken.tokenId)
                  ]?.owner}`}
                  className="flex items-center text-[10px] font-medium md:text-[12px] md:text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {truncateString(
                    AMIGOS_METADATA[parseInt(amigoToken.tokenId)]?.owner ??
                      zeroAddress,
                    4,
                    4,
                  )}
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
