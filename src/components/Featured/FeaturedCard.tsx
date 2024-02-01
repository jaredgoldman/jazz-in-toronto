// Components
import { Card, Heading, Text, Flex, Link } from '@radix-ui/themes'

interface Props {
    title: string
    content?: string
    image?: string | null
    link?: string | null
    type: 'Artist' | 'Venue' | 'Event'
}

const typeColorMap = {
    Artist: 'bronze',
    Venue: 'blue',
    Event: 'mint'
} as const

const FeaturedCard = ({
    title,
    content = 'This is a short sample description for a featured card. Come check out our band/event/venue',
    image,
    link,
    type
}: Props) => {
    return (
        <Card
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(1,1,1,1) 80%), url(${
                    image ? image : 'none'
                })`
            }}
            variant="classic"
            className="bg-cover bg-center bg-no-repeat"
            size="5"
        >
            <Flex
                direction="column"
                grow="1"
                justify="end"
                className="h-[23rem]"
                gap="2"
            >
                <Heading>
                    Featured
                    <Text color={typeColorMap[type]}>{` ${type}`}</Text>
                </Heading>
                <Heading size="9" className="text-1xl font-bold text-white">
                    {title}
                </Heading>
                <Text className="text-gray-200">{content}</Text>
                {link && (
                    <Link href={link} color="bronze">
                        Learn more
                    </Link>
                )}
            </Flex>
        </Card>
    )
}

export default FeaturedCard
