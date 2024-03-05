"use client";

import { useEffect, useState } from "react";
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
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { zeroAddress } from "viem";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NounsAmigosContractAddress =
  process.env.NEXT_PUBLIC_NOUNS_AMIGOS_CONTRACT_ADDRESS ??
  "0x964629a577ebD3d1cc9ce4361BDcc1ABb282132F";

export default function AmigoToken() {
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

      // Log the NFTs.
      console.log(nfts);
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
    console.log("amigoOwnerData", amigoOwnerData);
    console.log("amigoMetadata", amigoMetadata);
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
  }

  async function getCollectionHolders() {
    const holders = await alchemy.nft.getOwnersForContract(
      NounsAmigosContractAddress,
      { withTokenBalances: true, includeCount: true },
    );
    console.log(holders);
    setAmigoHolders(holders);
  }

  useEffect(() => {
    if (!isCollectionFetched) {
      void getAmigoToken(-1);
      void getCollectionHolders();
      setIsCollectionFetched(true);
    }
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full justify-center bg-background text-foreground">
      <div className="flex h-full w-full flex-col items-end md:px-8 lg:w-4/5 xl:max-w-6xl">
        <div className="w-full pt-12 md:flex md:pt-16">
          <div className="w-full md:w-1/2">
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
              <div className="flex aspect-square w-full flex-col items-center justify-center space-y-3 bg-background">
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
          <div className="flex w-full flex-col space-y-2 p-4 md:w-1/2">
            <div className="flex w-full justify-start space-x-8 md:justify-between md:space-x-0 lg:justify-start lg:space-x-8">
              <Button
                className="md:px-2"
                variant="ghost"
                onClick={() =>
                  parseInt(displayAmigoToken?.tokenId ?? "1") > 1 &&
                  getAmigoToken(parseInt(displayAmigoToken?.tokenId ?? "2") - 1)
                }
              >
                <ChevronLeftIcon className="h-8 w-8" />
              </Button>
              <h1
                className={`${nounsFont.className} hidden text-5xl md:block lg:hidden`}
              >
                Amigo {displayAmigoToken?.tokenId}
              </h1>
              <Button className="md:px-2" variant="ghost">
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
              </Button>
            </div>
            <div className="w-full px-4">
              <h1
                className={`${nounsFont.className} text-6xl md:hidden lg:block`}
              >
                Amigo {displayAmigoToken?.tokenId}
              </h1>
              <div className="flex items-center justify-between px-4 py-2 text-lg md:px-6 md:text-base">
                <p>Acuñado:</p>
                {displayAmigoToken?.mint?.timestamp ? (
                  <p>
                    {new Date(
                      displayAmigoToken?.mint?.timestamp ?? "No disponible",
                    ).toDateString()}
                  </p>
                ) : (
                  <p>No disponible</p>
                )}
              </div>
              <div className="flex items-center justify-between px-4 text-lg md:px-6 md:text-base">
                <p>Dueño:</p>
                {displayAmigoOwner ? (
                  <Link
                    href={`https://etherscan.io/address/${displayAmigoOwner}`}
                    className="flex items-center text-2xl font-medium text-primary md:text-xl"
                  >
                    {truncateString(displayAmigoOwner ?? zeroAddress, 4, 4)}{" "}
                    <ExternalLink className="ml-2 h-4 w-4 text-gray-700 md:h-3 md:w-3" />
                  </Link>
                ) : (
                  <p>No disponible</p>
                )}
              </div>
              <div className="flex items-center justify-between px-4 md:px-6">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full md:hidden"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="py-2">
                      <h3
                        className={`${nounsFont.className} text-2xl md:text-3xl`}
                      >
                        Rasgos
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent className="text-xl md:pb-0 md:text-lg">
                      <div className="pl-4">
                        <ul className="list-inside list-[square] marker:text-primary">
                          <li>Rasgo 1</li>
                          <li>Rasgo 2</li>
                          <li>Rasgo 3</li>
                          <li>Rasgo 4</li>
                          <li>Rasgo 5</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="hidden md:flex md:w-full md:flex-col">
                  <h3
                    className={`${nounsFont.className} py-2 text-2xl md:text-3xl`}
                  >
                    Rasgos
                  </h3>
                  <div className="pl-4 text-xl md:pb-0 md:text-lg">
                    <ul className="list-inside list-[square] marker:text-primary">
                      <li>Rasgo 1</li>
                      <li>Rasgo 2</li>
                      <li>Rasgo 3</li>
                      <li>Rasgo 4</li>
                      <li>Rasgo 5</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center pb-4 md:hidden">
          <a href="#stats">
            <Button
              variant="ghost"
              className="border-none px-0 pb-0 pt-4 text-primary hover:bg-transparent hover:text-primary"
            >
              <ChevronsDown className="h-12 w-12" />
            </Button>
          </a>
          <p className={`${nounsFont.className} text-2xl font-light`}>
            Más información sobre colección
          </p>
        </div>
        <div
          id="stats"
          className="flex w-full flex-col space-y-4 px-8 py-8 md:pt-16"
        >
          <div className="w-full text-center">
            <h2 className={`${nounsFont.className} text-4xl`}>
              Colección AMIGO
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-6 md:gap-y-0 md:px-16">
            <div className="rounded-lg bg-secondary p-4 text-center text-background">
              {amigosCollection ? (
                <p className="text-2xl font-medium">
                  {amigosCollection.length}
                </p>
              ) : (
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-[2.5px] border-solid border-background border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                />
              )}
              <p className="text-lg font-medium">
                Amigos <br className="hidden md:block" />
                acuñados
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4 text-center text-background">
              {amigoHolders ? (
                <p className="text-2xl font-medium">
                  {amigoHolders.owners.length}
                </p>
              ) : (
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-[2.5px] border-solid border-background border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                />
              )}
              <p className="text-lg font-medium">
                Holders <br className="hidden md:block" />
                AMIGO
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4 text-center text-background">
              <p className="text-2xl font-medium">{amigosCollection.length}</p>
              <p className="text-lg font-medium">
                ETH <br className="hidden md:block" />
                distribuido
              </p>
            </div>
          </div>
        </div>
        <div
          id="amigo-utility-section"
          className="flex w-full flex-col space-y-4 px-8 py-4 md:py-6"
        >
          <div className="w-full text-center">
            <h2 className={`${nounsFont.className} text-4xl`}>Utilidad</h2>
          </div>
          <AmigoUtilitySection />
        </div>
        <div id="amigo-gallery-section" className="px-8 py-4 md:py-6">
          <div className="w-full text-center">
            <h2 className={`${nounsFont.className} text-4xl`}>Galería</h2>
          </div>
          {isCollectionFetched && (
            <div className="py-6">
              <AmigoGallery amigosCollection={amigosCollection} />
            </div>
          )}
        </div>
      </div>
    </div>
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

function AmigoGallery({ amigosCollection }: { amigosCollection: Nft[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
      {amigosCollection
        .sort(() => Math.random() - 0.5)
        .map((amigoToken) => (
          <div className="flex aspect-square w-full justify-center">
            <div className="relative w-full">
              <Image
                src={amigoToken.image.originalUrl!}
                alt={`Token Amigo with tokenId ${amigosCollection[
                  amigosCollection.length - 1
                ]?.tokenId}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="rounded-lg hover:cursor-pointer hover:ring-[3px] hover:ring-primary"
              />
            </div>
          </div>
        ))}
    </div>
  );
}
