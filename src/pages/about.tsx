// Components
import RootLayout from '~/layouts/RootLayout'
import Image from 'next/image'
import { Badge, Link } from '@radix-ui/themes'
import { Flex, Heading, Text, Grid } from '@radix-ui/themes'

const staffMembers = [
    {
        name: 'Ori Dagan',
        title: 'Artistic Director, Listings Editor'
    },
    {
        name: 'Lina Welch',
        title: 'Founder & Managing Director'
    },
    {
        name: 'Mark Lemieux',
        title: 'Communications'
    },
    {
        name: 'Camille Neirynck',
        title: 'Marketing Director'
    },
    {
        name: 'Jared Goldman',
        title: 'Chief Technology Officer'
    },
    {
        name: 'Zoe Ackah',
        title: 'Development Officer'
    },
    {
        name: 'Frank van Biesen',
        title: 'Accountant'
    },
    {
        name: 'Lise Watson',
        title: 'Communications Officer'
    },
    {
        name: 'Kyle Sullivan',
        title: 'Producer of Young Artist Series'
    },
    {
        name: 'Kate Lam',
        title: 'Graphic Designer'
    },
    {
        name: 'Kendra Boyle',
        title: 'Content Creator'
    }
]

const boardMembers = [
    'Frank van Biesen',
    'Michael Bourgeois',
    'Chloé Watkinson',
    'Andrew Kaiser',
    'Donné Roberts',
    'Sybil Walker',
    'Alice Sellwood',
    'Paul Corby',
    'Peter Sellers',
    'Heather Bambrick',
    'Rudy Ray',
    'Ahmed Moneka'
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
                gap="9"
            >
                <Flex direction="column" gap="8">
                    <Heading
                        align="center"
                        size={{ initial: '8', xs: '9' }}
                        mb="3"
                    >
                        About Us
                    </Heading>
                    <Text
                        align={{ initial: 'center', xs: 'left' }}
                        mx={{ initial: '4', md: '0' }}
                        className="max-w-2xl"
                    >
                        JazzInToronto is a platform which promotes local jazz
                        artists in the Greater Toronto Area, connecting
                        audiences, musicians, venues and presenters. We offer a
                        platform which bundles all jazz-related information and
                        showcases a complete range of artists from new talents
                        to established jazz musicians to increase the
                        discoverability and access to the works of Canadian
                        musicians.
                    </Text>
                </Flex>
                <Flex direction="column" gap="8">
                    <Heading align="center" size={{ initial: '8', xs: '9' }}>
                        Our Team
                    </Heading>
                    <Grid
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
                    <Image
                        src="/images/team.jfif"
                        width={800}
                        height={500}
                        alt="Jazz In Toronto team"
                    />
                </Flex>
                <Flex direction="column" align="center" gap="5">
                    <Heading
                        align="center"
                        size={{ initial: '8', xs: '9' }}
                        mb="3"
                    >
                        Support Us
                    </Heading>
                    <Text
                        align={{ initial: 'center', xs: 'left' }}
                        className="max-w-2xl"
                        mx={{ initial: '4', md: '0' }}
                    >
                        JazzInToronto Inc. is a volunteer-fueled community hub
                        connecting Toronto’s jazz audiences, musicians, venues
                        and presenters. Donations are highly appreciated, and
                        support our programming, curation, and operational
                        costs.
                    </Text>
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
                    <Badge size="2">
                        <Link href="https://paypal.me/JazzInToronto" size="5">
                            Support JazzInToronto
                        </Link>
                    </Badge>
                </Flex>
                <Flex direction="column" gap="8">
                    <Heading align="center" size={{ initial: '8', xs: '9' }}>
                        Our Board of Directors
                    </Heading>
                    <Grid
                        columns="2"
                        rows="2"
                        gap="3"
                        mx={{ initial: '3', md: '0' }}
                    >
                        {boardMembers.map((member) => {
                            return (
                                <Flex direction="column" key={member}>
                                    <Heading
                                        align={{
                                            initial: 'center',
                                            xs: 'left'
                                        }}
                                        className="font-bold"
                                    >
                                        {member}
                                    </Heading>
                                </Flex>
                            )
                        })}
                    </Grid>
                    <Image
                        src="/images/board-of-directors.jpg"
                        height={1000}
                        width={1000}
                        alt="Jazz In Toronto board"
                    />
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
