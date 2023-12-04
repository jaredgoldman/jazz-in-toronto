import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'
import { Flex, Heading, Link, Text, Box } from '@radix-ui/themes'
import Image from 'next/image'

export default function Home() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Home" fullWidth={true}>
            <Flex
                direction="column"
                align="center"
                justify="start"
                className="bg-hero-pattern bg-cover bg-center bg-no-repeat pt-24 pb-80"
            >
                <Heading size="9" mb="6" align="center">
                    We are JazzInToronto
                </Heading>
                <Text size="7" align="center" className="max-w-5xl">
                    JazzInToronto is a not-for-profit organization dedicated to
                    promoting, connecting, and nourishing Toronto’s live music
                    scene.
                </Text>
            </Flex>
            <Flex
                className="gap-12 bg-gray-900"
                justify="center"
                align="center"
                py="9"
            >
                <Heading size="8">Follow us on our socials!</Heading>
                <Link mx="3" href="https://www.instagram.com/jazzintoronto/ ">
                    <Image
                        src="/images/facebook.png"
                        alt="facebook"
                        width={100}
                        height={100}
                    />
                </Link>
                <Link mx="3" href="https://www.facebook.com/jazzintoronto/ ">
                    <Image
                        src="/images/instagram.svg"
                        alt="facebook"
                        width={100}
                        height={100}
                    />
                </Link>
            </Flex>
            <Flex
                justify="center"
                className="bg-hero-pattern-2 bg-cover bg-center bg-no-repeat p-36"
            >
                <Box className="max-w-5xl">
                    <Featured />
                </Box>
            </Flex>
        </RootLayout>
    )
}
