// Components
import Loading from '~/components/Loading'
import { Container, Box } from '@radix-ui/themes'
// Type
import { ReactNode } from 'react'

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
            <Box p="4">{isLoading ? <Loading /> : children}</Box>
        </Container>
    )
}
