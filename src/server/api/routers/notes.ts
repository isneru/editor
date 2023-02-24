import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { z } from "zod"

export const notesRouter = createTRPCRouter({
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
    }),
  changeName: publicProcedure
    .input(z.object({ name: z.string(), noteId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.update({
        where: {
          id: input.noteId
        },
        data: {
          name: input.name
        }
      })
    })
})
