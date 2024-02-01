import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'
import { Flex, Heading, Link, Text } from '@radix-ui/themes'
import Image from 'next/image'
import { api } from '~/utils/api'

export default function Home() {
    const { data: featuredItems } = api.data.getFeatured.useQuery()

    return (
        <RootLayout pageTitle="Jazz In Toronto | Home">
            <Flex
                direction="column"
                align="center"
                justify="center"
                className="h-[50rem] bg-hero-pattern bg-cover bg-center bg-no-repeat"
            >
                <Heading
                    size={{ initial: '8', sm: '9' }}
                    align="center"
                    weight="bold"
                >
                    We are JazzInToronto
                </Heading>
                <Image
                    src="/images/logo.svg"
                    alt="facebook"
                    width={350}
                    height={350}
                    className="my-16"
                />

                <Text
                    size={{ initial: '6', xs: '7' }}
                    align="center"
                    className="max-w-2xl"
                >
                    JazzInToronto is a not-for-profit organization dedicated to
                    promoting, connecting, and nourishing Toronto’s live music
                    scene.
                </Text>
            </Flex>
            <Flex
                className="h-[30rem] bg-gray-900"
                align="center"
                justify="center"
                direction={{ initial: 'column', md: 'row' }}
                gap="9"
            >
                <Heading size="9" align="center" mb={{ initial: '6', xs: '0' }}>
                    Follow us on our socials!
                </Heading>
                <Flex gap="9" justify="between">
                    <Link href="https://www.instagram.com/jazzintoronto/ ">
                        <Image
                            src="/images/facebook.png"
                            alt="facebook"
                            width={130}
                            height={130}
                        />
                    </Link>
                    <Link href="https://www.facebook.com/jazzintoronto/ ">
                        <Image
                            src="/images/instagram.svg"
                            alt="facebook"
                            width={130}
                            height={130}
                        />
                    </Link>
                </Flex>
            </Flex>
            {featuredItems &&
            Object.values(featuredItems).filter(Boolean).length >= 3 ? (
                <Flex
                    justify="center"
                    grow="1"
                    className="bg-hero-pattern-2 bg-cover bg-center bg-no-repeat"
                >
                    <Featured />
                </Flex>
            ) : null}
        </RootLayout>
    )
}
