import { useEffect, ReactNode } from 'react'
import Header from '~/components/Header'
import Head from 'next/head'
import Footer from '~/components/Footer'
import { Flex, Callout } from '@radix-ui/themes'
import { HeaderType } from '~/components/Header/utils'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Breadcrumbs } from '~/components/Breadcrumbs/Breadcrumbs'
import { Toast } from '~/components/Toast/Toast'
import { useAtomValue } from 'jotai'
import { toastAtom, useToast } from '~/hooks/useToast'

type Props = {
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
    const { resetToast } = useToast()
    const toastState = useAtomValue(toastAtom)

    useEffect(() => {
        resetToast()
    }, [resetToast])

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Flex direction="column" className="min-h-screen">
                {(toastState.visible || toastState.animating) && <Toast />}
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
                <Flex direction="column" width="100%" grow="1">
                    {children}
                </Flex>
                <Footer />
            </Flex>
        </>
    )
}
