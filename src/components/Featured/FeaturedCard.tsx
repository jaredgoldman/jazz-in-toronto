import Container from '../Container'

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
        <Container
            width="md"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(1,1,1,1) 95%), url(${
                    image ? image : 'none'
                })`
            }}
        >
            <div className="flex flex-col p-4">
                <h2 className="text-1xl mb-2 font-bold">{title}</h2>
                <p className="text-white-700">{content}</p>
                {link && (
                    <a
                        href={link}
                        className="mt-2 inline-block text-blue-500 hover:underline"
                    >
                        Learn more
                    </a>
                )}
            </div>
        </Container>
    )
}

export default FeaturedCard
