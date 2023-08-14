import { type ReactNode } from 'react'
import Loading from '~/components/Loading'
import { Container } from '@radix-ui/themes'

interface Props {
    children: ReactNode
    isLoading?: boolean
    width?: '100%'
    size?: '1' | '2' | '3' | '4'
}

export default function FormLayout({
    children,
    isLoading,
    width = '100%',
    size = '4'
}: Props) {
    return (
        <Container width={width} size={size}>
            {isLoading ? <Loading /> : children}
        </Container>
    )
}
