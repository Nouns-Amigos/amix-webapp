export type projectElementType = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  content: React.ReactNode;
  stats: React.ReactNode;
};

export const PROJECTS_ARRAY: projectElementType[] = [
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
