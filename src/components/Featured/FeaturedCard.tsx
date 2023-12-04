// Components
import { Card, Heading, Text, Flex, Link } from '@radix-ui/themes'

interface Props {
    title: string
    content?: string
    image?: string | null
    link?: string | null
}

const FeaturedCard = ({
    title,
    content = 'This is a short sample description for a featured card. Come check out our band/event/venue',
    image,
    link
}: Props) => {
    return (
        <Card
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(1,1,1,1) 70%), url(${
                    image ? image : 'none'
                })`
            }}
            variant="classic"
            className="min-h-[20rem] bg-cover bg-center bg-no-repeat"
        >
            <Flex direction="column" justify="end" height="100%" p="2">
                <Heading className="text-1xl mb-2 font-bold text-white">
                    {title}
                </Heading>
                <Text className="text-gray-200">{content}</Text>
                {link && (
                    <Link href={link} color="tomato">
                        Learn more
                    </Link>
                )}
            </Flex>
        </Card>
    )
}

export default FeaturedCard
