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
                justify="start"
                className="bg-hero-pattern bg-cover bg-center bg-no-repeat pb-60 pt-36"
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
                className=" gap-12 bg-gray-900 py-20"
                justify="center"
                align="center"
                direction={{ initial: 'column', sm: 'row' }}
                px="2"
            >
                <Heading
                    size="9"
                    align={{ initial: 'center', xs: 'left' }}
                    mb={{ initial: '6', xs: '0' }}
                >
                    Follow us on our socials!
                </Heading>
                <Flex gap="6">
                    <Link href="https://www.instagram.com/jazzintoronto/ ">
                        <Image
                            src="/images/facebook.png"
                            alt="facebook"
                            width={100}
                            height={100}
                        />
                    </Link>
                    <Link href="https://www.facebook.com/jazzintoronto/ ">
                        <Image
                            src="/images/instagram.svg"
                            alt="facebook"
                            width={100}
                            height={100}
                        />
                    </Link>
                </Flex>
            </Flex>
            <Flex
                justify="center"
                className="min-h-[70rem] bg-hero-pattern-2 bg-cover bg-center bg-no-repeat pb-36 pt-60"
            >
                <Flex className="max-w-6xl" grow="1">
                    <Featured />
                </Flex>
            </Flex>
        </RootLayout>
    )
}
