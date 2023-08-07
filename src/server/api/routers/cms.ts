// Libraries
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { env } from '~/env.mjs'
import { GraphQLClient } from 'graphql-request'
import { graphql } from '../../../gql'

const url = `${env.CMS_API_URL}/graphql`

const graphQlClient = new GraphQLClient(url, {
    headers: {
        Authorization: `Bearer ${env.CMS_API_KEY}`
    }
})

export const cmsRouter = createTRPCRouter({
    about: publicProcedure.query(async () => {
        // const res = await graphQLClient.request(aboutQuery)
        // return res
        const aboutQuery = graphql(`
            query aboutUs {
                about {
                    data {
                        attributes {
                            heading
                            description
                            teamHeading
                            staffMembers {
                                data {
                                    attributes {
                                        position
                                        name
                                    }
                                }
                            }
                            teamImage {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                            supportHeading
                            supportDescription
                            paypalProfileUrl
                            eTransferAddress
                            imageCollage {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                            ctaText
                        }
                    }
                }
            }
        `)

        return await graphQlClient.request(aboutQuery)
    })
})
