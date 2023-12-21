// Components
import RootLayout from '~/layouts/RootLayout'
import Image from 'next/image'
import { Badge, Link } from '@radix-ui/themes'
import { Flex, Heading, Text, Grid } from '@radix-ui/themes'

const staffMembers = [
    {
        name: 'Lina Welch',
        title: 'Founder, Managing Director'
    },
    {
        name: 'Ori Dagan',
        title: 'Founder, Managing Director'
    },
    {
        name: 'Mark Lemieux',
        title: 'Communications'
    },
    {
        name: 'Camille Neirynck',
        title: 'Marketing Director'
    }
]

export default function About() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | About Us">
            <Flex
                direction="column"
                align="center"
                width="100%"
                mx="auto"
                p={{ initial: '5', xs: '9' }}
            >
                <Heading mb="8" align="center" size={{ initial: '8', xs: '9' }}>
                    About Us
                </Heading>
                <Text
                    mb="5"
                    align={{ initial: 'center', xs: 'left' }}
                    mx={{ initial: '4', md: '0' }}
                    className="max-w-2xl"
                >
                    JazzInToronto is a platform which promotes local jazz
                    artists in the Greater Toronto Area, connecting audiences,
                    musicians, venues and presenters. We offer a platform which
                    bundles all jazz-related information and showcases a
                    complete range of artists from new talents to established
                    jazz musicians to increase the discoverability and access to
                    the works of Canadian musicians.
                </Text>
                <Flex justify="start" mt="5" align="center">
                    <div className="flex-1 border-b"></div>
                    <Heading align="center" className="px-3">
                        Our Team
                    </Heading>
                    <div className="flex-1 border-b"></div>
                </Flex>
                <Flex width="100%" justify="center">
                    <Grid
                        my="5"
                        columns="2"
                        rows="2"
                        gapX="9"
                        gapY="5"
                        mx={{ initial: '3', md: '0' }}
                    >
                        {staffMembers.map((member) => {
                            return (
                                <Flex direction="column" key={member.name}>
                                    <Heading
                                        align={{
                                            initial: 'center',
                                            xs: 'left'
                                        }}
                                        className="font-bold"
                                    >
                                        {member.title}
                                    </Heading>
                                    <Text
                                        align={{
                                            initial: 'center',
                                            xs: 'left'
                                        }}
                                        size="3"
                                        weight="medium"
                                    >
                                        {member.name}
                                    </Text>
                                </Flex>
                            )
                        })}
                    </Grid>
                </Flex>
                <Flex mb="9" width="100%" justify="center">
                    <Image
                        src="/images/team.jpg"
                        width={800}
                        height={500}
                        alt="Jazz In Toronto team"
                    />
                </Flex>
                <Flex justify="start" mb="5" align="center">
                    <div className="flex-1 border-b"></div>
                    <Heading align="center" className="px-4">
                        Support Us
                    </Heading>
                    <div className="flex-1 border-b"></div>
                </Flex>
                <Text
                    mb="5"
                    align={{ initial: 'center', xs: 'left' }}
                    className="max-w-2xl"
                    mx={{ initial: '4', md: '0' }}
                >
                    JazzInToronto Inc. is a volunteer-fueled community hub
                    connecting Toronto’s jazz audiences, musicians, venues and
                    presenters. Donations are highly appreciated, and support
                    our programming, curation, and operational costs.
                </Text>
                <Flex justify="center">
                    <Flex
                        justify="between"
                        direction={{ initial: 'column', md: 'row' }}
                        gap={{ initial: '3', md: '9' }}
                        my="6"
                    >
                        <Flex direction="column" mb={{ initial: '5', md: '0' }}>
                            <Heading
                                size="3"
                                align={{ initial: 'center', xs: 'left' }}
                            >
                                Paypal
                            </Heading>
                            <Link
                                className="text-blue-500"
                                href="https://paypal.me/JazzInToronto"
                            >
                                paypal.me/JazzInToronto
                            </Link>
                        </Flex>
                        <Flex direction="column">
                            <Heading
                                size="3"
                                align={{ initial: 'center', xs: 'left' }}
                            >
                                ETransfer
                            </Heading>
                            <Link
                                className="text-blue-500"
                                href="mailto:jazzintoronto@outlook.com"
                            >
                                jazzintoronto@outlook.com
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex mb="9" justify="center">
                    <Badge>
                        <Link href="https://paypal.me/JazzInToronto">
                            Support JazzInToronto
                        </Link>
                    </Badge>
                </Flex>
                <Image
                    src="/images/jit-collage.png"
                    height={1000}
                    width={1000}
                    alt="Jazz In Toronto team"
                />
            </Flex>
        </RootLayout>
    )
}
