import { type ReactNode } from 'react'

interface Props {
    children: ReactNode
    className?: string
    style?: React.CSSProperties & { '--image-url'?: string }
}

export default function Container({
    children,
    className = '',
    style
}: Props): JSX.Element {
    return (
        <div style={style} className={`m-2 ${className}`}>
            {children}
        </div>
    )
}
