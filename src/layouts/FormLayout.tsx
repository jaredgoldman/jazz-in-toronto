import { type ReactNode } from 'react'
import Loading from '~/components/Loading'

interface Props {
    children: ReactNode
    isLoading?: boolean
}

export default function FormLayout({ children, isLoading }: Props) {
    return (
        <div className="mb-6 w-full">{isLoading ? <Loading /> : children}</div>
    )
}
