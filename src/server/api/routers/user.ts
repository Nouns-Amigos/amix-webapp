import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        appWallet: z.string(),
        username: z.string(),
        extWallet: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existingUser = await ctx.db.user.findUnique({
          where: { username: input.username },
        });

        if (existingUser) {
          return {
            newUser: null,
            message: "Ese nombre de usuario no se encuentra disponible...",
          };
        }

        const newUser = await ctx.db.user.create({ data: input });

        return {
          newUser,
        };
      } catch (error) {
        console.log(error);
        return {
          error,
          errorMsg: "Something went wrong, check the console",
        };
      }
    }),

  getUsers: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.user.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      console.log(error);
      return {
        error,
        errorMsg: "Something went wrong, check the console",
      };
    }
  }),

  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: {
            id: input.id,
          },
        });
        return { user };
      } catch (error) {
        console.log(error);
        return {
          error,
          errorMsg: "Something went wrong, check the console",
          user: null,
        };
      }
    }),
});
