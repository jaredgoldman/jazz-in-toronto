import { type ReactNode } from 'react'
import Loading from '~/components/Loading'
import { Container } from '@radix-ui/themes'

interface Props {
    children: ReactNode
    isLoading?: boolean
}

export default function FormLayout({ children, isLoading }: Props) {
    return (
        <Container width="100%">{isLoading ? <Loading /> : children}</Container>
    )
}
