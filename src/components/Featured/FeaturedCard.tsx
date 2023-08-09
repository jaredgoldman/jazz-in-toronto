import Container from '../Container'
import Image from 'next/image'

interface Props {
    title: string
    content: string
    image?: string | null
    link?: string
    className?: string
}
const FeaturedCard = ({ title, content, image, link, className }: Props) => {
    return (
        <Container className={`m-4 rounded-lg p-4 shadow-md ${className}`}>
            <h2 className="mb-2 text-2xl font-bold">{title}</h2>
            {image && (
                <div className="h-48 object-contain">
                    <Image
                        className="h-48 w-full rounded-t-lg object-cover"
                        src={image}
                        height={100}
                        width={100}
                        alt={title}
                    />
                </div>
            )}
            <div className="p-4">
                <p className="text-gray-700">{content}</p>
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
