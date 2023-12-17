import { default as NextLink } from 'next/link'
import { Link as RadixLink, Responsive } from '@radix-ui/themes'
import { LinkProps } from 'next/link'

type Props = {
    href: string
    size?: Responsive<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'>
    className?: string
    children: React.ReactNode
} & LinkProps

export default function Link({
    href,
    size = '2',
    children,
    className,
    ...rest
}: Props) {
    return (
        <RadixLink size={size} asChild>
            <NextLink href={href} className={className} {...rest}>
                {children}
            </NextLink>
        </RadixLink>
    )
}
