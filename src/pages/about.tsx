// Components
import RootLayout from '~/layouts/RootLayout'
import { api } from '~/utils/api'
import Image from 'next/image'
import { env } from '~/env.mjs'
import Button from '~/components/Button'
import Loading from '~/components/Loading'

export default function About(): JSX.Element {
    const { data } = api.cms.about.useQuery()

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
                                src={`${env.NEXT_PUBLIC_CMS_API_URL}${teamImagePath}`}
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
                                src={`${env.NEXT_PUBLIC_CMS_API_URL}${imageCollagePath}`}
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
