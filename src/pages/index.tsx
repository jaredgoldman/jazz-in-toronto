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
// Utils

export default function Home() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Home" fullWidth={true}>
            <Box pb="7">
                <Container size="3" className="flex-grow" py="8">
                    <Heading size="9" mb="6" align="center">
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
            <Box className="bg-gray-200 dark:bg-gray-900" p="7">
                <Container size="3" className="flex-grow" py="8">
                    <Heading size="8" align="center" mb="7">
                        Follow us on our socials!
                    </Heading>
                    <Flex justify="center" mb="7">
                        <Link
                            mx="3"
                            className="bg-gray-100 p-5 "
                            href="https://www.instagram.com/jazzintoronto/ "
                        >
                            <Button size="4">Instagram</Button>
                        </Link>
                        <Link
                            mx="3"
                            href="https://www.facebook.com/jazzintoronto/ "
                        >
                            <Button size="4" color="yellow">
                                Facebook
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
