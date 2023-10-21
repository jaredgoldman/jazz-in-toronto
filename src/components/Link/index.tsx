import { default as NextLink } from 'next/link'
import { Link as RadixLink, type Responsive } from '@radix-ui/themes'

interface Props {
    href: string
    size?: Responsive<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'>
    className?: string
    children: React.ReactNode
}

export default function Link({ href, size = '5', children, className }: Props) {
    return (
        <RadixLink size={size} className="!no-underline" asChild>
            <NextLink href={href} className={className}>
                {children}
            </NextLink>
        </RadixLink>
    )
}
