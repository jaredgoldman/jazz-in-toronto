// Components
import { Card, Heading, Text, Flex, Link } from '@radix-ui/themes'

interface Props {
    heading: string
    content?: string
    image?: string | null
    link?: string | null
    headingClassname: string
}

const FeaturedCard = ({
    heading,
    content = 'This is a short sample description for a featured card. Come check out our band/event/venue',
    image,
    link,
    headingClassname
}: Props) => {
    console.log({
        image
    })
    return (
        <Card
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(1,1,1,1) 80%), url(${
                    image ? image : 'none'
                })`
            }}
            variant="classic"
            className="max-w-xl bg-cover bg-center bg-no-repeat"
            size="3"
        >
            <Flex
                direction="column"
                grow="1"
                justify="end"
                className="h-[26rem]"
                gap="2"
            >
                <Heading size="9" mb="4" className={headingClassname}>
                    {heading}
                </Heading>
                <Text className="text-gray-200">{content}</Text>
                {link && (
                    <Link href={link} color="orange">
                        Learn more
                    </Link>
                )}
            </Flex>
        </Card>
    )
}

export default FeaturedCard
