import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'
import { Flex, Heading, Link, Text } from '@radix-ui/themes'
import Image from 'next/image'

export default function Home() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Home">
            <Flex
                direction="column"
                align="center"
                justify="center"
                className="h-[50rem] bg-hero-pattern bg-cover bg-center bg-no-repeat"
            >
                <Heading
                    size={{ initial: '8', xs: '9' }}
                    align="center"
                    weight="bold"
                >
                    We are JazzInToronto
                </Heading>
                <Flex>
                    <Image
                        src="/images/logo.svg"
                        alt="facebook"
                        width={350}
                        height={350}
                        className="my-16"
                    />
                </Flex>
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
                className="h-[30rem] bg-[var(--slate-1)]"
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
            <Flex
                justify="center"
                grow="1"
                className="bg-hero-pattern-2 bg-cover bg-center bg-no-repeat"
                pb="6"
            >
                <Featured />
            </Flex>
        </RootLayout>
    )
}
