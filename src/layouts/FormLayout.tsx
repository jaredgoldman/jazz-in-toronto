import { type ReactNode } from 'react'
import Loading from '~/components/Loading'

interface Props {
    children: ReactNode
    isLoading?: boolean
    isModal?: boolean
}

export default function FormLayout({
    children,
    isLoading,
    isModal = false
}: Props) {
    const padding = isModal ? 'p-5' : ''
    return (
        <div
            className={`mb-6 flex w-full max-w-[30rem] flex-col items-center ${padding}`}
        >
            {isLoading ? <Loading /> : children}
        </div>
    )
}
