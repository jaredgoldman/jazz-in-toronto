import RootLayout from '~/layouts/RootLayout'
import { Flex, Heading } from '@radix-ui/themes'
import Image from 'next/image'

export default function Services() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | About Us">
            <Flex
                direction="column"
                align="center"
                width="100%"
                mx="auto"
                p={{ initial: '5', xs: '9' }}
                gap="8"
            >
                <Heading align="center" size={{ initial: '8', xs: '9' }} mb="3">
                    Our Services
                </Heading>
                <Image
                    src="/images/rates.png"
                    height={1000}
                    width={1000}
                    alt="Jazz In Toronto team"
                />
            </Flex>
        </RootLayout>
    )
}
