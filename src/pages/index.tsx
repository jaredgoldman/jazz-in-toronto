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
// Utils
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Hepta_Slab } from 'next/font/google'

const hepta_slab = Hepta_Slab({
    weight: ['400', '500'],
    subsets: ['latin'],
    preload: true
})

export default function Home() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Home" fullWidth={true}>
            <Box p="7">
                <Container size="3" className="flex-grow" py="8">
                    <Flex gap="3" width="100%">
                        <Flex direction="column" gap="2" align="start">
                            <Heading size="8" mb="6" align="center">
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
                            <Card size="5" variant="classic"></Card>
                            <Card size="2" variant="classic"></Card>
                            <Card size="2" variant="classic"></Card>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
            <Box p="7" className="flex items-center justify-center">
                <Card size="3" variant="classic" className="w-[80%] shadow">
                    <Heading
                        size="8"
                        align="center"
                        mb="7"
                        mt="3"
                        className={hepta_slab.className}
                    >
                        Follow us on our socials!
                    </Heading>
                    <Flex justify="center" mb="7">
                        <span className="mt-px inline-block h-px w-10 border-t border-gray-400 bg-opacity-30 dark:border-orange-400 sm:w-16 md:w-44"></span>
                        <span className="mx-3 inline-block h-[4px] w-[4px] rounded-full bg-gray-800 bg-opacity-80 dark:bg-orange-400" />
                        <span className="mt-px inline-block h-px w-10  border-t border-gray-400 bg-opacity-30 dark:border-orange-400 sm:w-16 md:w-44"></span>
                    </Flex>
                    <Flex justify="center" mb="4">
                        <Link
                            mx="2"
                            className="bg-gray-100"
                            href="https://www.instagram.com/jazzintoronto/ "
                        >
                            <Button
                                size="4"
                                color="orange"
                                style={{ padding: '8px 12px' }}
                            >
                                <FontAwesomeIcon
                                    className="h-8"
                                    icon={['fab', 'instagram']}
                                />
                                {/* Instagram */}
                            </Button>
                        </Link>
                        <Link
                            mx="2"
                            href="https://www.facebook.com/jazzintoronto/ "
                        >
                            <Button
                                size="4"
                                color="indigo"
                                style={{ padding: '8px 10px' }}
                            >
                                <FontAwesomeIcon
                                    className="h-8 text-white"
                                    icon={['fab', 'facebook']}
                                />
                                {/* Facebook */}
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
