import { CommunityProjects } from "@/components/comunidad/CommunityProjects";
import { nounsFont } from "@/lib/fonts";
import React from "react";

export default function Comunidad() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full justify-center bg-background py-8 text-foreground lg:pt-12">
      <div className="flex h-full w-full flex-col space-y-4 px-4 md:w-4/5 xl:max-w-5xl">
        <div className="w-full text-left lg:px-4">
          <h1 className={`${nounsFont.className} text-5xl`}>
            Impacto de nuestra comunidad
          </h1>
        </div>
        <div className="flex flex-col space-y-4 md:space-y-8 lg:px-4">
          <p className="mt-2 text-lg md:text-xl lg:text-left">
            Desde meet-ups, construir unos Noggles gigantes en Japón, o crear
            proyectos tecnológicos,{" "}
            <span className="font-bold">
              en Nouns Amigos DAO apoyamos proyectos de todos los tamaños.
            </span>
          </p>
        </div>
        <CommunityProjects />
      </div>
    </div>
  );
}
