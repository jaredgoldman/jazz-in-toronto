// Components
import RootLayout from '~/layouts/RootLayout'
import Image from 'next/image'
import { Badge, Link } from '@radix-ui/themes'
import { graphQlWithAuth } from '~/utils/gql'
import { graphql } from '../gql'
import { type AboutUsQuery } from '~/gql/graphql'
import { type GetStaticProps, type InferGetStaticPropsType } from 'next'
import { Flex, Heading, Text, Grid, Box, Container } from '@radix-ui/themes'

const query = graphql(`
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

export const getStaticProps: GetStaticProps<{
    data: AboutUsQuery
}> = async () => {
    const data = await graphQlWithAuth<AboutUsQuery>(query)
    return { props: { data } }
}

export default function About({
    data
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    const aboutData = data?.about?.data?.attributes
    const teamImagePath = aboutData?.teamImage?.data?.attributes?.url || null
    const imageCollagePath =
        aboutData?.imageCollage?.data?.attributes?.url || null

    return (
        <RootLayout>
            <Box width="auto">
                <Heading mb="5" align="center">
                    {aboutData?.heading}
                </Heading>
                <Text mb="5" align="left">
                    {aboutData?.description}
                </Text>
                <Flex justify="start" mt="5" align="center">
                    <div className="flex-1 border-b"></div>
                    <Heading align="center" className="px-3">
                        {aboutData?.teamHeading}
                    </Heading>
                    <div className="flex-1 border-b"></div>
                </Flex>
                <Grid my="5" columns="2" rows="2" gapX="9" gapY="5">
                    {aboutData?.staffMembers?.data?.map((member) => {
                        return (
                            <div key={member.attributes?.name}>
                                <Heading className="font-bold">
                                    {member.attributes?.position}
                                </Heading>
                                <Text>{member.attributes?.name}</Text>
                            </div>
                        )
                    })}
                </Grid>
                {teamImagePath && (
                    <div className="mb-10">
                        <Image
                            src={teamImagePath}
                            width={800}
                            height={500}
                            alt="Jazz In Toronto team"
                        />
                    </div>
                )}
                <Flex justify="start" mb="5" align="center">
                    <div className="flex-1 border-b"></div>
                    <Heading align="center" className="px-4">
                        {aboutData?.supportHeading}
                    </Heading>
                    <div className="flex-1 border-b"></div>
                </Flex>
                <Text align="left">{aboutData?.supportDescription}</Text>
                <Flex justify="center">
                    <Flex my="9" justify="between">
                        {aboutData?.paypalProfileUrl && (
                            <Flex mr="9" direction="column">
                                <div>Paypal</div>
                                <a
                                    className="text-blue-500"
                                    href={`https://${aboutData?.paypalProfileUrl}`}
                                >
                                    {aboutData?.paypalProfileUrl}
                                </a>
                            </Flex>
                        )}
                        {aboutData?.eTransferAddress && (
                            <Flex ml="9" direction="column">
                                <div>ETransfer</div>
                                <a
                                    className="text-blue-500"
                                    href={`mailto:${aboutData?.eTransferAddress}`}
                                >
                                    {aboutData?.eTransferAddress}
                                </a>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                <Flex mb="9" justify="center">
                    {aboutData?.ctaText && aboutData?.paypalProfileUrl && (
                        <Badge>
                            <Link href={aboutData.paypalProfileUrl}>
                                {aboutData.ctaText}
                            </Link>
                        </Badge>
                    )}
                </Flex>
                {imageCollagePath && (
                    <Image
                        src={imageCollagePath}
                        height={1000}
                        width={1000}
                        alt="Jazz In Toronto team"
                    />
                )}
            </Box>
        </RootLayout>
    )
}
