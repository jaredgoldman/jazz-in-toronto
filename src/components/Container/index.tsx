import { type ReactNode } from 'react'
import classnames from 'classnames'

interface Props {
    children: ReactNode
    style?: React.CSSProperties & { '--image-url'?: string }
    maxWidth?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    width?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    justify?: 'left' | 'center' | 'right'
}

export default function Container({
    children,
    style,
    maxWidth = 'full',
    width = 'full',
    justify
}: Props): JSX.Element {
    return (
        <div className={`flex w-full justify-center`}>
            <div
                style={style}
                className={classnames(`m-2 flex overflow-auto`, {
                    'max-w-full': maxWidth === 'full',
                    'max-w-xl': maxWidth === 'xl',
                    'max-w-lg': maxWidth === 'lg',
                    'max-w-md': maxWidth === 'md',
                    'max-w-sm': maxWidth === 'sm',
                    'max-w-xs': maxWidth === 'xs',
                    'w-full': maxWidth === 'full',
                    'w-80': width === 'lg',
                    'w-60': width === 'md',
                    'w-44': width === 'sm',
                    'w-28': width === 'xs',
                    'w-24': width === '2xs',
                    'w-14': width === '3xs',
                    'justify-left': justify === 'left',
                    'justify-center': justify === 'center',
                    'justify-right': justify === 'right'
                })}
            >
                {children}
            </div>
        </div>
    )
}
