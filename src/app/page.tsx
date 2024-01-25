import Image from "next/image";

import { nounsFont } from "@/lib/fonts";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import DefaultCard from "@/components/cards/DefaultCard";
import {
  HeartHandshakeIcon,
  InboxIcon,
  LightbulbIcon,
  SproutIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";

export default async function Home() {
  return (
    <>
      <div className="flex h-full flex-col items-center md:h-[calc(100svh-64px)]">
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
      <AmigoToken />
      <HowItWorks />
      <Benefits />
    </>
  );
}

function WhatIsNounsSection() {
  return (
    <div className="w-full bg-primary lg:flex lg:justify-center">
      <div className="flex h-full flex-col gap-y-6 px-6 py-16 text-brandWhite md:py-20 lg:max-w-3xl lg:py-12 lg:text-center xl:py-20">
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

function AmigoToken() {
  return (
    <div className="w-full bg-brandWhiteLavender lg:flex lg:justify-center">
      <div className="flex h-full flex-col gap-y-6 px-6 py-16 text-black md:py-20 lg:max-w-3xl lg:py-12 lg:text-center xl:py-20">
        <div className="w-full md:flex md:flex-col">
          <h2
            className={`${nounsFont.className} text-left text-4xl text-secondary xs:text-5xl md:text-center`}
          >
            Token AMIGO
          </h2>
          <div className="flex flex-col items-center gap-y-4">
            <div className="w-full md:flex md:w-2/3 md:items-center">
              <p className="mt-2 text-[22px] sm:text-[2rem] md:text-2xl lg:text-left">
                El token AMIGO es nuestra colección insignia, el cual otorga
                poder de votación sobre las rondas de props, y que identifica a
                los ganadores de propuestas anteriores.
              </p>
            </div>
            <div className="w-full md:flex md:w-2/3 md:justify-center">
              <Accordion type="single" collapsible className="w-4/5">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <h2
                      className={`${nounsFont.className} text-3xl xs:text-4xl`}
                    >
                      Nouns DAO Amigos
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent className="text-xl">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus reiciendis sunt quisquam officiis quas aperiam
                    molestiae fuga non a recusandae mollitia omnis tempora
                    nobis, quo quidem iste eveniet animi! A!
                    <div className="flex w-full justify-center py-6">
                      <Button
                        size="lg"
                        className={`${nounsFont.className} text-2xl`}
                      >
                        Únete al Discord
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h2
                      className={`${nounsFont.className} text-3xl xs:text-4xl`}
                    >
                      Rasgos AMIGO
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent className="text-xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                    delectus possimus voluptatibus nulla dolore quibusdam
                    repellendus odio molestias harum.
                    <div className="py-3 pl-2">
                      <ul className="list-inside list-[square] marker:text-secondary">
                        <li>Rasgo 1</li>
                        <li>Rasgo 2</li>
                        <li>Rasgo 3</li>
                        <li>Rasgo 4</li>
                        <li>Rasgo 5</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <h2
                      className={`${nounsFont.className} text-3xl xs:text-4xl`}
                    >
                      Cómo obtenerlo
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-y-2 text-xl">
                    <p>
                      Los token AMIGO se distribuyen al concretar exitosamente
                      lo comprometido en una prop ganadora.
                    </p>
                    <p>
                      Esto compromete a los builders a desarrollar sus
                      propuestas, y una vez obtenido, a participar en la
                      gobernanza de la DAO.
                    </p>
                    <p>
                      Así que, el primer paso es convertir tu idea en una prop y
                      participar en una ronda.
                    </p>
                    <h3
                      className={`text-center text-2xl xs:text-3xl ${nounsFont.className}`}
                    >
                      ¿Qué esperas?
                    </h3>
                    <div className="flex w-full justify-center py-6">
                      <Button
                        size="lg"
                        className={`${nounsFont.className} text-2xl`}
                      >
                        Crea tu Prop
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <div className="w-full bg-primary md:flex md:justify-center">
      <div className="flex h-full flex-col gap-y-6 px-6 py-16 text-brandWhite md:max-w-lg md:pb-20 md:pt-24 lg:py-12 xl:max-w-2xl xl:py-20 xl:text-center">
        <h2
          className={`${nounsFont.className} text-center text-3xl xs:text-4xl`}
        >
          ¿Cómo funciona el fondeo?
        </h2>
        <DefaultCard title="1. Desarrolla tu idea">
          <p className="text-xl">
            Si tienes una idea, conviértela en una propuesta. Compártela, busca
            retroalimentación y mejórala.
          </p>
        </DefaultCard>
        <DefaultCard title="2. Participa en una ronda">
          <p className="text-xl">
            Busca una ronda y "sube" tu propuesta en Prop House. Es lo primero
            que verá la comunidad <br />
            ¡Y tal vez lo único!
          </p>
        </DefaultCard>
        <DefaultCard title="3. Involúcrate con la comunidad">
          <p className="text-xl">
            Aquí es donde sucede la magia. Participa en las sesiones de
            pitch-eo, comparte en redes, etc.
          </p>
        </DefaultCard>
        <DefaultCard title="4. Asignación de ganadores">
          <p className="text-xl">
            Los holders votarán, y una vez terminada la votación, se anunciará a
            los ganadores. Aquí puedes "reclamar" el "premio" monetario.
          </p>
        </DefaultCard>
        <DefaultCard title="5. Construye en público">
          <p className="text-xl">
            ¡A trabajar! Comparte avances, colabora con la comunidad y hazlo
            divertido.
          </p>
        </DefaultCard>
        <DefaultCard title="6. Recibe tu AMIGO">
          <p className="text-xl">
            Con tus avances y entrega de tu proyecto, podrás llenar el
            formulario para recibir tu AMIGO.
          </p>
        </DefaultCard>
      </div>
    </div>
  );
}

const features = [
  {
    name: "Haz realidad tus ideas",
    description:
      "Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.",
    href: "#",
    icon: LightbulbIcon,
  },
  {
    name: "Proyectos con impacto social",
    description:
      "Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.",
    href: "#",
    icon: HeartHandshakeIcon,
  },
  {
    name: "Participa en la gobernanza",
    description:
      "Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.",
    href: "#",
    icon: SproutIcon,
  },
];

function Benefits() {
  return (
    <div className="bg-brandWhiteLavender py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl">
          <h2
            className={`${nounsFont.className} text-3xl font-bold tracking-tight text-secondary xs:text-4xl md:text-5xl`}
          >
            Disfruta mientras construyes con impacto
          </h2>
          <p className="mt-6 text-xl leading-8 text-foreground">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-2xl font-semibold leading-7 text-foreground">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      className="h-8 w-8 text-brandWhiteLavender"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col leading-7 text-foreground">
                  <p className="flex-auto text-xl">{feature.description}</p>
                  {/* <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-indigo-400"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p> */}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
