// Libraries
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { env } from '~/env.mjs'
import { GraphQLClient } from 'graphql-request'
import aboutQuery from '../graphql/about'

const url = `${env.CMS_API_URL}`

const graphQLClient = new GraphQLClient(url, {
    headers: {
        authorization: `Bearer ${env.CMS_API_KEY}`
    }
})

export const cmsRouter = createTRPCRouter({
    about: publicProcedure.query(async () => {
        return await graphQLClient.request(aboutQuery)
    })
})
