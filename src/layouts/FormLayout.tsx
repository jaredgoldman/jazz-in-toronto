import { type ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function FormLayout({ children }: Props) {
    return <div className="mb-6 w-full">{children}</div>
}
