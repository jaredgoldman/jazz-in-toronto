// Components
import Loading from '~/components/Loading'
import { Container } from '@radix-ui/themes'
// Type
import { type ReactNode } from 'react'

interface Props {
    children: ReactNode
    isLoading?: boolean
    maxWidth?: 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl'
    overflow?: 'overflow-x-auto' | 'overflow-y-auto' | ''
}

export default function FormLayout({
    children,
    isLoading,
    maxWidth = 'max-w-xl',
    overflow = ''
}: Props) {
    return (
        <Container
            mx={{ initial: '3', sm: 'auto' }}
            className={`${maxWidth} ${overflow}`}
        >
            {isLoading ? <Loading /> : children}
        </Container>
    )
}
