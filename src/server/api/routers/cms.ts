// Libraries
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { env } from '~/env.mjs'
import { gql, GraphQLClient } from 'graphql-request'

const url = `${env.CMS_API_URL}`

const graphQLClient = new GraphQLClient(url, {
    headers: {
        authorization: `Bearer ${env.CMS_API_KEY}`
    }
})

export const cmsRouter = createTRPCRouter({
    about: publicProcedure.query(async () => {
        const document = gql`
            query {
                about {
                    data {
                        attributes {
                            Heading
                            Description
                            staff_members {
                                data {
                                    attributes {
                                        Name
                                        Position
                                    }
                                }
                            }
                            Team {
                                Heading
                                Image {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                            Support {
                                Heading
                                Description
                                Paypal
                                Email
                                CTA
                                Images {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `

        return await graphQLClient.request(document)
    })
})
