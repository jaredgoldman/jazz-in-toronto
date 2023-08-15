// Components
import Loading from '~/components/Loading'
import { Container } from '@radix-ui/themes'
// Type
import { type ReactNode } from 'react'

interface Props {
    children: ReactNode
    isLoading?: boolean
    maxWidth?: 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl'
}

export default function FormLayout({
    children,
    isLoading,
    maxWidth = 'max-w-xl'
}: Props) {
    return (
        <Container mx={{ initial: '3', sm: 'auto' }} className={maxWidth}>
            {isLoading ? <Loading /> : children}
        </Container>
    )
}
