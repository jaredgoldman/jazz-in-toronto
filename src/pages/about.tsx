// Components
import RootLayout from '~/layouts/RootLayout'
import Image from 'next/image'
import Button from '~/components/Button'
import Loading from '~/components/Loading'
import Container from '~/components/Container'
import { graphQlWithAuth } from '~/utils/gql'
import { graphql } from '../gql'
import { type AboutUsQuery } from '~/gql/graphql'
import { type GetStaticProps, type InferGetStaticPropsType } from 'next'

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
    console.log('DATA', data)
    const aboutData = data?.about?.data?.attributes || null
    const teamImagePath = aboutData?.teamImage?.data?.attributes?.url || null
    const imageCollagePath =
        aboutData?.imageCollage?.data?.attributes?.url || null

    return (
        <RootLayout>
            {aboutData ? (
                <Container className="flex w-1/2 max-w-[40rem] flex-col items-center">
                    <h1 className="mb-10 text-center text-4xl font-bold">
                        {aboutData?.heading}
                    </h1>
                    <p className="mb-5 text-left text-sm">
                        {aboutData?.description}
                    </p>
                    <div className="justify-left mb-5 flex w-full items-center">
                        <div className="flex-1 border-b"></div>
                        <h2 className="px-4 text-center text-2xl ">
                            {aboutData?.teamHeading}
                        </h2>
                        <div className="flex-1 border-b"></div>
                    </div>
                    <div className="mb-5 grid w-full grid-cols-2 grid-rows-2 gap-x-10 gap-y-5 text-sm">
                        {aboutData?.staffMembers?.data?.map((member) => {
                            return (
                                <div className="" key={member.attributes?.name}>
                                    <h3 className="font-bold">
                                        {member.attributes?.position}
                                    </h3>
                                    <p>{member.attributes?.name}</p>
                                </div>
                            )
                        })}
                    </div>
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
                    <div>
                        <div className="justify-left mb-5 flex w-full items-center">
                            <div className="flex-1 border-b"></div>
                            <h2 className="px-4 text-center text-2xl ">
                                {aboutData?.supportHeading}
                            </h2>
                            <div className="flex-1 border-b"></div>
                        </div>
                        <p className="text-left text-sm">
                            {aboutData?.supportDescription}
                        </p>
                        <div>
                            <div className="my-10 flex max-w-[35rem] justify-between">
                                {aboutData?.paypalProfileUrl && (
                                    <div className="flex flex-col">
                                        <div>Paypal</div>
                                        <a
                                            className="text-blue-500"
                                            href={`https://${aboutData?.paypalProfileUrl}`}
                                        >
                                            {aboutData?.paypalProfileUrl}
                                        </a>
                                    </div>
                                )}
                                {aboutData?.eTransferAddress && (
                                    <div className="flex flex-col">
                                        <div>ETransfer</div>
                                        <a
                                            className="text-blue-500"
                                            href={`mailto:${aboutData?.eTransferAddress}`}
                                        >
                                            {aboutData?.eTransferAddress}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-10 flex w-full justify-center">
                            {aboutData?.ctaText &&
                                aboutData?.paypalProfileUrl && (
                                    <Button
                                        roundedBorder={false}
                                        size="xl"
                                        link={`https://${aboutData?.paypalProfileUrl}`}
                                    >
                                        {aboutData?.ctaText}
                                    </Button>
                                )}
                        </div>
                        {imageCollagePath && (
                            <div className="mb-10 flex justify-center">
                                <Image
                                    src={imageCollagePath}
                                    height={1000}
                                    width={1000}
                                    alt="Jazz In Toronto team"
                                />
                            </div>
                        )}
                    </div>
                </Container>
            ) : (
                <Loading />
            )}
        </RootLayout>
    )
}
