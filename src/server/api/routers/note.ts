import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { z } from "zod"

export const noteRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.create({
        data: {
          name: "Untitled",
          user: {
            connect: {
              id: input.userId
            }
          }
        },
        include: {
          user: true,
          folder: true
        }
      })
    }),

  getAllByUserId: publicProcedure
    .input(z.object({ userId: z.string().nullish() }))
    .query(async ({ input, ctx }) => {
      if (!input.userId) return
      return await ctx.prisma.note.findMany({
        where: {
          userId: input.userId
        }
      })
    })
})
