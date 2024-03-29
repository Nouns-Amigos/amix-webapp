"use client";

import type { JSX, SVGProps } from "react";
import { nounsFont } from "@/lib/fonts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import DefaultCard from "@/components/cards/DefaultCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const SocialLinks = [
  {
    name: "Discord",
    href: "https://discord.gg/we3HY9YBfZ",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 16 16" {...props}>
        <path d="M13.545 2.907a13.227 13.227 0 00-3.257-1.011.05.05 0 00-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 00-3.658 0 8.258 8.258 0 00-.412-.833.051.051 0 00-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 00-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 003.995 2.02.05.05 0 00.056-.019c.308-.42.582-.863.818-1.329a.05.05 0 00-.01-.059.051.051 0 00-.018-.011 8.875 8.875 0 01-1.248-.595.05.05 0 01-.02-.066.051.051 0 01.015-.019c.084-.063.168-.129.248-.195a.05.05 0 01.051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 01.053.007c.08.066.164.132.248.195a.051.051 0 01-.004.085 8.254 8.254 0 01-1.249.594.05.05 0 00-.03.03.052.052 0 00.003.041c.24.465.515.909.817 1.329a.05.05 0 00.056.019 13.235 13.235 0 004.001-2.02.049.049 0 00.021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 00-.02-.019zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612z" />
      </svg>
    ),
  },
  {
    name: "Farcaster",
    href: "https://warpcast.com/nounsamigos",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 169 155"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M29 0H138V155H122V84H121.843C120.075 64.3773 103.583 49 83.5 49C63.4169 49 46.9253 64.3773 45.157 84H45V155H29V0Z"
          fill="currentColor"
        />
        <path
          d="M0 22L6.5 44H12V133C9.23858 133 7 135.239 7 138V144H6C3.23858 144 1 146.239 1 149V155H57V149C57 146.239 54.7614 144 52 144H51V138C51 135.239 48.7614 133 46 133H40V22H0Z"
          fill="currentColor"
        />
        <path
          d="M123 133C120.239 133 118 135.239 118 138V144H117C114.239 144 112 146.239 112 149V155H168V149C168 146.239 165.761 144 163 144H162V138C162 135.239 159.761 133 157 133V44H162.5L169 22H129V133H123Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://twitter.com/NounsDAOAmigos",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/nouns-amigos",
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function NounsAmigosDaoPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full justify-center bg-background py-8 text-foreground lg:pt-12">
      <div className="flex h-full w-full flex-col md:px-8 lg:w-4/5 xl:max-w-5xl">
        <h1 className={`${nounsFont.className} text-center text-5xl`}>
          Nosotros
        </h1>
        <div className="flex flex-col px-8 py-4 md:flex-row">
          <div className="w-full space-y-4 md:flex md:w-1/2 md:flex-col md:justify-center">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              voluptas corporis sapiente non eius asperiores molestias ipsum
              illum saepe, odit, inventore alias, voluptatem ea ducimus
              praesentium delectus magnam aperiam libero.
            </p>
            <ul className="list-inside list-[square] pl-4 text-base marker:text-primary">
              <li>Carteras Multifirma</li>
              <li>Colección AMIGO</li>
              <li>Casa Prop House (rondas de votación)</li>
              <li>Eventos y meetups</li>
              <li>Ser Nounish</li>
            </ul>
          </div>
          <div className="relative aspect-square w-full md:w-1/2">
            <Image
              src="/icons/android-chrome-512x512.png"
              alt="AMIGO token example: a burro with noggles wearing a red shirt that says 'hola'"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2 px-8 py-4">
          <div className="w-full text-left">
            <h2 className={`${nounsFont.className} text-3xl md:text-4xl`}>
              Canales de comunicación
            </h2>
          </div>
          <p>
            Si quieres interactuar con nosotros, participar en la comunidad y
            estar enterado de lo que hacemos en Nouns Amigos, lo puedes hacer a
            través de estos canales:
          </p>
          <div className="grid grid-cols-2 gap-4 py-2 md:w-2/3 md:grid-cols-3 lg:w-4/5 lg:grid-cols-5">
            {SocialLinks.map((item, index) => (
              <div
                key={`social-link-${index + 1}`}
                className="flex w-full justify-center"
              >
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-gray-500 hover:text-primary"
                >
                  <item.icon
                    className="h-8 w-8 hover:text-primary"
                    aria-hidden="true"
                  />
                  <p className={`${nounsFont.className} text-2xl`}>
                    {item.name}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
        <TokenAmigo />
        <div className="flex flex-col space-y-2 px-8 py-4">
          <h2 className={`${nounsFont.className} pb-2 text-3xl md:text-4xl`}>
            Carteras Multifirma
          </h2>
          <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8 md:px-12 md:py-4">
            <Card className="border-[3px] border-secondary">
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  Cartera DAO
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-[3px] border-secondary">
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  Cartera Grants
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-[3px] border-secondary">
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  Cartera Prop House
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className="flex flex-col space-y-2 px-8 py-4">
          <h2 className={`${nounsFont.className} pb-2 text-3xl md:text-4xl`}>
            Prop House
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quod
            iure soluta ratione excepturi libero. Temporibus eaque aut
            consequatur nesciunt pariatur voluptatibus eum soluta delectus in
            culpa, officiis, iste repellendus.
          </p>
          <div className="py-4 md:flex md:justify-center">
            <HowItWorks />
          </div>
        </div>
      </div>
    </div>
  );
}

function TokenAmigo() {
  return (
    <div className="flex flex-col space-y-2 px-8 py-4">
      <h2 className={`${nounsFont.className} pb-2 text-3xl md:text-4xl`}>
        Colección AMIGO
      </h2>
      <div className="flex w-full flex-col items-center space-y-4 md:flex-row">
        <div className="relative aspect-square w-3/4 md:w-1/2">
          <Image
            src="/icons/android-chrome-512x512.png"
            alt="AMIGO token example: a burro with noggles wearing a red shirt that says 'hola'"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="w-full md:w-1/2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum in
            accusantium quos quo laboriosam. Magni quia quam asperiores
            eligendi, itaque doloremque harum vero impedit modi vel consequatur?
            Assumenda, iusto magni!
          </p>
          <div className="flex w-full justify-center pt-4">
            <Button className={`${nounsFont.className} text-xl`}>
              Conoce más
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <div className="w-full rounded-lg bg-secondary md:flex md:w-4/5 md:justify-center">
      <div className="flex h-full flex-col space-y-4 px-6 py-8 text-background">
        <h3 className={`${nounsFont.className} pb-2 text-2xl md:text-3xl`}>
          ¿Cómo funciona el fondeo?
        </h3>
        <DefaultCard title="1. Desarrolla tu idea">
          <p className="text-lg">
            Si tienes una idea, conviértela en una propuesta. Compártela, busca
            retroalimentación y mejórala.
          </p>
        </DefaultCard>
        <DefaultCard title="2. Participa en una ronda">
          <p className="text-lg">
            Busca una ronda y "sube" tu propuesta en Prop House. Es lo primero
            que verá la comunidad <br />
            ¡Y tal vez lo único!
          </p>
        </DefaultCard>
        <DefaultCard title="3. Involúcrate con la comunidad">
          <p className="text-lg">
            Aquí es donde sucede la magia. Participa en las sesiones de
            pitch-eo, comparte en redes, etc.
          </p>
        </DefaultCard>
        <DefaultCard title="4. Asignación de ganadores">
          <p className="text-lg">
            Los holders votarán, y una vez terminada la votación, se anunciará a
            los ganadores. Aquí puedes "reclamar" el "premio" monetario.
          </p>
        </DefaultCard>
        <DefaultCard title="5. Construye en público">
          <p className="text-lg">
            ¡A trabajar! Comparte avances, colabora con la comunidad y hazlo
            divertido.
          </p>
        </DefaultCard>
        <DefaultCard title="6. Recibe tu AMIGO">
          <p className="text-lg">
            Con tus avances y entrega de tu proyecto, podrás llenar el
            formulario para recibir tu AMIGO.
          </p>
        </DefaultCard>
      </div>
    </div>
  );
}
