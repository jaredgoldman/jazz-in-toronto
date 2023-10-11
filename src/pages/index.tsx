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
    Container
} from '@radix-ui/themes'
import HrDivider from '~/components/HrDivider'
// Utils
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Home" fullWidth={true}>
            <Box p="7">
                <Container size="3" className="flex-grow" py="8">
                    <Heading size="8" mb="6" align="center">
                        We are JAZZINTORONTO
                    </Heading>
                    <Text size="6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </Text>
                </Container>
            </Box>
            <Box p="7">
                <Container
                    size="3"
                    className="mx-auto w-[62%] flex-grow rounded-lg bg-gray-200 dark:bg-gray-900"
                    py="9"
                >
                    <Heading size="8" align="center" mb="7">
                        Follow us on our socials!
                    </Heading>
                    <Flex justify="center" mb="7">
                        <HrDivider />
                    </Flex>
                    <Flex justify="center" mb="7">
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
                </Container>
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
