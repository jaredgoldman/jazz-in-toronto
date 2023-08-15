// Components
import RootLayout from '~/layouts/RootLayout'
import Image from 'next/image'
import { Badge, Link } from '@radix-ui/themes'
import { Flex, Heading, Text, Grid, Box } from '@radix-ui/themes'
// Types
import { type AboutUsQuery } from '~/gql/graphql'
import { type GetStaticProps, type InferGetStaticPropsType } from 'next'
// Utils
import { graphQlWithAuth } from '~/utils/gql'
import { graphql } from '../gql'

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
        <RootLayout pageTitle="Jazz In Toronto | About Us">
            <Flex direction="column" align="center" width="100%" mx="auto">
                <Heading mb="5" align="center">
                    {aboutData?.heading}
                </Heading>
                <Text
                    mb="5"
                    align="left"
                    mx={{ initial: '4', md: '0' }}
                    className="max-w-2xl"
                >
                    {aboutData?.description}
                </Text>
                <Flex justify="start" mt="5" align="center">
                    <div className="flex-1 border-b"></div>
                    <Heading align="center" className="px-3">
                        {aboutData?.teamHeading}
                    </Heading>
                    <div className="flex-1 border-b"></div>
                </Flex>
                <Flex width="100%" justify="center">
                    <Grid
                        my="5"
                        columns="2"
                        rows="2"
                        gapX="9"
                        gapY="5"
                        mx={{ initial: '3', md: '0' }}
                    >
                        {aboutData?.staffMembers?.data?.map((member) => {
                            return (
                                <Box key={member.attributes?.name}>
                                    <Heading className="font-bold">
                                        {member.attributes?.position}
                                    </Heading>
                                    <Text>{member.attributes?.name}</Text>
                                </Box>
                            )
                        })}
                    </Grid>
                </Flex>
                {teamImagePath && (
                    <Flex mb="9" width="100%" justify="center">
                        <Image
                            src={teamImagePath}
                            width={800}
                            height={500}
                            alt="Jazz In Toronto team"
                        />
                    </Flex>
                )}
                <Flex justify="start" mb="5" align="center">
                    <div className="flex-1 border-b"></div>
                    <Heading align="center" className="px-4">
                        {aboutData?.supportHeading}
                    </Heading>
                    <div className="flex-1 border-b"></div>
                </Flex>
                <Text
                    mb="5"
                    align="left"
                    className="max-w-2xl"
                    mx={{ initial: '4', md: '0' }}
                >
                    {aboutData?.supportDescription}
                </Text>
                <Flex justify="center">
                    <Flex
                        justify="between"
                        direction={{ initial: 'column', md: 'row' }}
                        gap={{ initial: '3', md: '9' }}
                        my="6"
                    >
                        {aboutData?.paypalProfileUrl && (
                            <Flex
                                direction="column"
                                mb={{ initial: '5', md: '0' }}
                            >
                                <Heading size="3">Paypal</Heading>
                                <Link
                                    className="text-blue-500"
                                    href={`https://${aboutData?.paypalProfileUrl}`}
                                >
                                    {aboutData?.paypalProfileUrl}
                                </Link>
                            </Flex>
                        )}
                        {aboutData?.eTransferAddress && (
                            <Flex direction="column">
                                <Heading size="3">ETransfer</Heading>
                                <Link
                                    className="text-blue-500"
                                    href={`mailto:${aboutData?.eTransferAddress}`}
                                >
                                    {aboutData?.eTransferAddress}
                                </Link>
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
            </Flex>
        </RootLayout>
    )
}
