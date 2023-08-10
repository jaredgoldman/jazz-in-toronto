import { type ReactNode } from 'react'
import Loading from '~/components/Loading'
import classnames from 'classnames'

interface Props {
    children: ReactNode
    isLoading?: boolean
    padding?: 'sm' | 'md' | 'lg'
    width?: 'sm' | 'md' | 'lg'
}

export default function FormLayout({
    children,
    isLoading,
    padding = 'md',
    width = 'sm'
}: Props) {
    return (
        <div
            className={classnames(`mb-6 flex w-full flex-col items-center`, {
                'px-3': padding === 'sm',
                'px-7': padding === 'md',
                'px-10': padding === 'lg',
                'max-w-sm': width === 'sm',
                'max-w-md': width === 'md',
                'max-w-lg': width === 'lg'
            })}
        >
            {isLoading ? <Loading /> : children}
        </div>
    )
}
