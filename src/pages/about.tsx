// Components
import RootLayout from '~/layouts/RootLayout'
import Image from 'next/image'
import Button from '~/components/Button'
import Loading from '~/components/Loading'
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
                <>
                    <div>
                        <h1>{aboutData?.heading}</h1>
                        <p>{aboutData?.description}</p>
                    </div>
                    <div>
                        <h2>{aboutData?.teamHeading}</h2>
                        {aboutData?.staffMembers?.data?.map((member) => {
                            return (
                                <div key={member.attributes?.name}>
                                    <h3>{member.attributes?.position}</h3>
                                    <p>{member.attributes?.name}</p>
                                </div>
                            )
                        })}
                        {teamImagePath && (
                            <Image
                                src={teamImagePath}
                                height={200}
                                width={200}
                                alt="Jazz In Toronto team"
                            />
                        )}
                    </div>
                    <div>
                        <h2>{aboutData?.supportHeading}</h2>
                        <p>{aboutData?.supportDescription}</p>
                        <div>
                            {aboutData?.paypalProfileUrl && (
                                <a href={aboutData?.paypalProfileUrl}>
                                    Donate on paypal
                                </a>
                            )}
                            {aboutData?.eTransferAddress && (
                                <a href={aboutData?.eTransferAddress}>
                                    Donate via etransfer
                                </a>
                            )}
                        </div>
                        {aboutData?.ctaText && (
                            <Button>{aboutData?.ctaText}</Button>
                        )}
                        {imageCollagePath && (
                            <Image
                                src={imageCollagePath}
                                height={200}
                                width={200}
                                alt="Jazz In Toronto team"
                            />
                        )}
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </RootLayout>
    )
}
