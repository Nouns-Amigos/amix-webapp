import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const postZodValidation = {
  title: z.string(),
  content: z.string().optional(),
  media_url: z.string().optional(),
  category: z.string().optional(),
  authorId: z.string(),
  communityId: z.string().optional(),
};

export const postRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(z.object(postZodValidation))
    .mutation(async ({ ctx, input }) => {
      try {
        const newPost = await ctx.db.post.create({ data: input });

        return {
          newPost,
        };
      } catch (error) {
        console.log(error);
        return {
          error,
          errorMsg: "Something went wrong, check the console",
        };
      }
    }),

  getAllTestimonials: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.post.findMany({
        where: {
          category: "testimonial",
        },
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

  getUserTestimonials: publicProcedure
    .input(z.object({ authorId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const userTestimonial = await ctx.db.post.findFirst({
          where: {
            AND: {
              authorId: input.authorId,
              category: "testimonial",
            },
          },
          orderBy: { createdAt: "desc" },
        });
        return { userTestimonial };
      } catch (error) {
        console.log(error);
        return {
          error,
          errorMsg: "Something went wrong, check the console",
          userTestimonial: null,
        };
      }
    }),

  updateUserPost: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        media_url: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedPost = await ctx.db.post.update({
          where: {
            id: input.id,
          },
          data: input,
        });
        return { userTestimonial: updatedPost };
      } catch (error) {
        console.log(error);
        return {
          error,
          errorMsg: "Something went wrong, check the console",
          userTestimonial: null,
        };
      }
    }),

  deleteUserPost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.post.delete({
          where: {
            id: input.postId,
          },
        });
      } catch (error) {
        console.log(error);
        return {
          error,
          errorMsg: "Something went wrong, check the console",
        };
      }
    }),
});
