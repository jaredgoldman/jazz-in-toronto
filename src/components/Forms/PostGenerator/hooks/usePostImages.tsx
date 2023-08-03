import { type EventWithBandVenue } from '~/types/data'
import PostImage from '../components/postImage'

export default function usePostImages(
    events: EventWithBandVenue[] | undefined,
    date: Date,
    eventsPerCanvas = 19
) {
    const files: { [key: string]: File } = {}
    const postImages: JSX.Element[] = []
    const eventsCopy = events ? [...events] : []
    const postImageEventsNeeded = Math.ceil(eventsCopy.length / eventsPerCanvas)

    const getFile = async (
        file: File,
        currentIndex: number
    ): Promise<Blob | undefined> => {
        if (files[currentIndex]) return
        files[currentIndex] = file
    }

    for (let i = 0; i < postImageEventsNeeded; i++) {
        const postImageEvents = eventsCopy.splice(0, eventsPerCanvas)
        const postImage = (
            <PostImage
                events={postImageEvents}
                date={date}
                key={i}
                fileCallback={getFile}
                index={i}
            />
        )
        postImages.push(postImage)
    }

    return {
        postImages,
        files
    }
}
