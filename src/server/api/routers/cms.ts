// Libraries
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const cmsRouter = createTRPCRouter({
    fetchData: protectedProcedure.query(() => {
        // fetch data from custom CMS endpoint here
        // we could also set up a graphQL request here I think?
    })
})
