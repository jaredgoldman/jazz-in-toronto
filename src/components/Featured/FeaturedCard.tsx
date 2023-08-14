import { Card, Heading, Text, Flex } from '@radix-ui/themes'

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
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(1,1,1,1) 95%), url(${
                    image ? image : 'none'
                })`
            }}
            m="2"
            variant="classic"
            className="min-h-[20rem] bg-cover bg-center bg-no-repeat"
        >
            <Flex direction="column" justify="start" height="100%" p="2">
                <Heading className="text-1xl mb-2 font-bold">{title}</Heading>
                <Text className="text-white-700">{content}</Text>
                {link && (
                    <a
                        href={link}
                        className="mt-2 inline-block text-blue-500 hover:underline"
                    >
                        Learn more
                    </a>
                )}
            </Flex>
        </Card>
    )
}

export default FeaturedCard
