// Libraries
// Components
import RootLayout from '~/layouts/RootLayout'
import Featured from '~/components/Featured'
import {
    Button,
    Flex,
    Heading,
    Link,
    Box,
    Text,
    Container,
    Card
} from '@radix-ui/themes'
import Image from 'next/image'
//utils
import { useTheme } from 'next-themes'
//assets

export default function Home() {
    const { theme } = useTheme()
    const textColor = theme === 'dark' ? 'white-200' : 'slate-800'
    return (
        <RootLayout pageTitle="Jazz In Toronto | Home" fullWidth={true}>
            <Box p="7">
                <Container size="3" className="flex-grow" py="8">
                    <Flex gap="3" width="100%" className={textColor}>
                        <Flex direction="column" gap="2" align="start">
                            <Heading
                                size="8"
                                mb="6"
                                align="center"
                                weight="medium"
                            >
                                We are JAZZINTORONTO
                            </Heading>
                            <Text size="3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </Text>
                        </Flex>
                        <Flex>
                            <Card size="5"></Card>
                            <Card size="2"></Card>
                            <Card size="2"></Card>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
            <Box p="7" className="flex items-center justify-center">
                <Card size="3" variant="ghost" className="w-[84%] shadow-lg">
                    <Heading
                        size="8"
                        align="center"
                        mb="7"
                        mt="3"
                        weight="medium"
                        className="font-mono text-slate-800 dark:text-white"
                    >
                        Follow us on our socials!
                    </Heading>
                    <Flex justify="center" mb="7">
                        <Text className="!mt-px inline-block h-px w-12 border-b border-gray-400 bg-opacity-30 dark:border-orange-400 sm:w-16 md:w-44"></Text>
                        <Text
                            mx="3"
                            className="inline-block h-[4px] w-[4px] rounded-full bg-gray-800 bg-opacity-80 dark:bg-orange-400"
                        />
                        <Text className="!mt-px inline-block h-px w-12 border-b border-gray-400 bg-opacity-30 dark:border-orange-400 sm:w-16 md:w-44"></Text>
                    </Flex>
                    <Flex justify="center" mb="4" gap="2">
                        <Link
                            mx="2"
                            className="bg-gray-100"
                            href="https://www.instagram.com/jazzintoronto/ "
                        >
                            <Button
                                size="4"
                                color="orange"
                                className="!h-[60px] h-4 w-4 w-[90px] rounded-full py-4 shadow-md hover:bg-orange-400"
                            >
                                <Image
                                    src="/images/Instagram_Glyph_White.svg"
                                    width={35}
                                    height={40}
                                    alt="Instagram logo"
                                />
                            </Button>
                        </Link>
                        <Link
                            mx="2"
                            href="https://www.facebook.com/jazzintoronto/"
                        >
                            <Button
                                size="4"
                                color="indigo"
                                className="!h-[60px] h-4 w-4 w-[90px] rounded-full py-4 shadow-md"
                            >
                                <Image
                                    src="/images/facebook-svgrepo-com.svg"
                                    width={45}
                                    height={45}
                                    alt="Facebook logo"
                                />
                            </Button>
                        </Link>
                    </Flex>
                </Card>
            </Box>
            <Box p="7">
                <Container size="3" className="flex-grow" py="8">
                    <Heading size="8" align="center" mb="7">
                        Featured
                    </Heading>
                    <Featured />
                </Container>
            </Box>
        </RootLayout>
    )
}
