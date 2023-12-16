import Header from '~/components/Header'
import Head from 'next/head'
import Footer from '~/components/Footer'
import { Container, Flex, Text, Callout } from '@radix-ui/themes'
import { HeaderType } from '~/components/Header/utils'
import { ReactNode } from 'react'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Breadcrumbs } from '~/components/Breadcrumbs/Breadcrumbs'

interface Props {
    pageTitle: string
    children: ReactNode | string
    breadcrumbs?: {
        href: string
        title: string
        currentPageTitle: string
    }
    calloutContent?: ReactNode
}

export default function RootLayout({
    children,
    pageTitle,
    breadcrumbs,
    calloutContent
}: Props): JSX.Element {
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Flex direction="column" className="h-screen">
                <Header headerType={HeaderType.Public} />
                {calloutContent && (
                    <Callout.Root>
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>{calloutContent}</Callout.Text>
                    </Callout.Root>
                )}
                {breadcrumbs && <Breadcrumbs {...breadcrumbs} />}
                <Flex direction="column">{children}</Flex>
                <Footer />
            </Flex>
        </>
    )
}
