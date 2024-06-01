import { Flex, Heading } from '@radix-ui/themes'
import RootLayout from '~/layouts/RootLayout'

export default function Artists() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Artists">
            <Flex width="100%" align="center" direction="column" px="6" py="9">
                <Heading
                    size={{ initial: '8', xs: '9' }}
                    align={{ initial: 'center', xs: 'left' }}
                    mb="6"
                >
                   Artists
                </Heading>
            </Flex>
        </RootLayout>
    )
}
