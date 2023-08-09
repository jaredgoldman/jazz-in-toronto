import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    className?: string
}

export default function Container({ children, className }: Props): JSX.Element {
    return <div className={`m-2 ${className}`}>{children}</div>
}
