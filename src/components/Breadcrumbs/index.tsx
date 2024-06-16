import { Flex, Text } from '@radix-ui/themes'
import Link from '../Link'

export type BreadcrumbProps = {
    href: string
    title: string
    currentPageTitle: string
}

export function Breadcrumbs({
    href,
    title,
    currentPageTitle
}: BreadcrumbProps) {
    return (
        <Flex align="center" pl="5" pt="3" gap="1">
            <Link size="1" href={href}>
                {title}{' '}
            </Link>
            <Text size="1">{'<'}</Text>
            <Text size="1">{`${currentPageTitle}`}</Text>
        </Flex>
    )
}
