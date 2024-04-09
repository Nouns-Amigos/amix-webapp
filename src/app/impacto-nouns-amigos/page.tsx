"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import AuthenticatedPage from "@/components/layout/authenticatedPage";
import { nounsFont } from "@/lib/fonts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import Loader from "@/components/feedback/Loader";
import { truncateString } from "@/utils";
import { toast } from "sonner";

const Cuenta = () => {
  const [testimonial, setTestimonial] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user } = usePrivy();
  const { wallets } = useWallets();
  const router = useRouter();

  const createUser = api.users.createUser.useMutation();
  const createTestimonial = api.posts.createPost.useMutation();
  const updateTestimonial = api.posts.updateUserPost.useMutation();
  const { isFetching, isError, data, refetch } =
    api.posts.getUserTestimonials.useQuery(
      { authorId: user?.id ?? "" },
      { enabled: Boolean(user?.id) },
    );
  const {
    isFetching: isFetchingUser,
    isError: isErrorUser,
    data: userData,
  } = api.users.getUserById.useQuery(
    { id: user?.id ?? "" },
    { enabled: Boolean(user?.id) },
  );

  async function onSubmitHandler(event: React.FormEvent) {
    event?.preventDefault();
    if (!testimonial || !username) {
      toast.warning("Ambos campos son requeridos");
      return;
    }
    setIsLoading(true);
    const appWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy",
    );
    const extWallet = wallets.find(
      (wallet) => wallet.walletClientType !== "privy",
    );
    if (!user?.id) {
      toast.error("No Privy user detected");
      setIsLoading(false);
      return;
    }
    if (!appWallet || !extWallet) {
      toast.error("Missing wallet data, unable to create user");
      setIsLoading(false);
      return;
    }
    try {
      const { newUser, message } = await createUser.mutateAsync({
        id: user?.id,
        appWallet: appWallet.address,
        username,
        extWallet: extWallet.address,
      });
      if (!newUser) {
        message && toast.warning(message);
        return;
      }
      const { newPost } = await createTestimonial.mutateAsync({
        authorId: newUser.id,
        title: `${username} Testimonial`,
        content: testimonial,
        category: "testimonial",
      });
      if (!newPost) throw new Error("Unable to create testimonial");
      toast.success("¡Felicidades, te has registrado exitosamente!");
      await refetch();
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error, agradecemos tu reporte 🤓");
    } finally {
      setIsLoading(false);
    }
  }

  async function onUpdatePost(event: React.FormEvent) {
    event?.preventDefault();
    if (!testimonial || !data?.userTestimonial) {
      toast.warning("Tu respuesta es requerida o no has hecho cambios");
      return;
    }
    setIsLoading(true);
    if (!user?.id) {
      toast.error("No Privy user detected");
      setIsLoading(false);
      setIsEditing(false);
      return;
    }
    try {
      const { userTestimonial } = await updateTestimonial.mutateAsync({
        id: data?.userTestimonial?.id,
        content: testimonial,
      });
      if (!userTestimonial) throw new Error("Unable to update testimonial");
      toast.success("¡Tu publicación ha sido actualizada!");
      await refetch();
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error, agradecemos tu reporte 🤓");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  }

  return (
    <AuthenticatedPage className="flex flex-col items-center px-6">
      <h1
        className={`${nounsFont.className} pb-8 text-center text-5xl text-redNoggles lg:w-full`}
      >
        gm!
      </h1>
      <div className="flex w-full flex-col items-center md:w-2/3 md:gap-x-4 lg:w-3/5 lg:px-8 xl:w-2/5 xl:px-0">
        {isFetching ? (
          <Loader />
        ) : data?.userTestimonial && userData ? (
          <div className="flex w-full flex-col gap-y-2 pb-4">
            <h4 className="text-xl font-semibold">
              <span className="font-normal">Nombre de usuario:</span>{" "}
              {userData.user?.username}
            </h4>
            <h4 className="text-xl font-semibold">
              <span className="font-normal">Cartera:</span>{" "}
              {truncateString(userData.user?.extWallet)}
            </h4>
            <div className="flex flex-col gap-y-1 pt-4">
              <label htmlFor="testimonial" className="text-xl font-semibold">
                Para tí, ¿qué impacto ha tenido Nouns DAO Amigos?
              </label>
              <Textarea
                id="testimonial"
                className="border-2 border-coolBgNouns bg-[#F6F6F6] text-base disabled:!bg-opacity-100 disabled:!text-stone-500 disabled:!opacity-100"
                rows={6}
                placeholder="En tu comunidad, camino web3, tu vida, etc..."
                onChange={(event) => setTestimonial(event.target.value)}
                defaultValue={data?.userTestimonial.content ?? ""}
                disabled={!isEditing}
              />
            </div>
            <div className="flex w-full justify-end gap-x-4">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    className="w-1/4 border-foreground text-base font-semibold"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="w-1/4 font-semibold"
                    onClick={onUpdatePost}
                  >
                    {isLoading ? (
                      <div
                        className="text-surface inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-base motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status"
                      />
                    ) : (
                      "Actualizar"
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  className="w-1/4 text-base font-semibold"
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col gap-y-2 pb-4">
              <p className="text-justify text-lg">
                Gracias por ser parte de esta aventura. Esta página es de
                nuestra comunidad, y queremos que más personas se unan y
                compartan con nosotros 😁
              </p>
              <p className="text-justify text-lg">
                Así que, cuéntale al mundo...
              </p>
            </div>
            <form className="flex flex-col gap-y-2" onSubmit={onSubmitHandler}>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="testimonial" className="text-xl font-semibold">
                  Para tí, ¿qué impacto ha tenido Nouns DAO Amigos?
                </label>
                <Textarea
                  id="testimonial"
                  className="border-2 border-coolBgNouns bg-[#F6F6F6] text-base"
                  rows={6}
                  placeholder="En tu comunidad, camino web3, tu vida, etc..."
                  onChange={(event) => setTestimonial(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="username" className="text-xl font-semibold">
                  ¿Cuál es tu nombre?
                </label>
                <Input
                  className="border-2 border-coolBgNouns bg-[#F6F6F6] text-base"
                  id="username"
                  placeholder="Se incluirá en el testimonio"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="flex w-full flex-col items-center gap-y-3 py-6">
                <Button
                  size="lg"
                  className={`${nounsFont.className} flex gap-x-2 !py-6 text-2xl `}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      Enviando...
                      <div
                        className="text-surface inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status"
                      />
                    </>
                  ) : (
                    "Enviar"
                  )}
                </Button>
                <Button
                  variant="link"
                  className="text-base text-foreground/75"
                  onClick={() => router.push("/")}
                  disabled={isLoading}
                >
                  No quiero participar
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </AuthenticatedPage>
  );
};

export default Cuenta;
