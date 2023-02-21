import { createTRPCRouter, publicProcedure } from "server/api/trpc"

export const folderRouter = createTRPCRouter({
  create: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.folder.create({
      data: {
        name: "Untitled"
      }
    })
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.folder.findMany()
  })
})
