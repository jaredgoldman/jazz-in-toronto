import { Box } from '@radix-ui/themes'
import Image from 'next/image'
import { EventWithArtistVenue } from '~/types/data'

type Props = {
    event: EventWithArtistVenue
    lat: number
    lng: number
}
// eslint-disable-next-line no-unused-vars
export function Marker({ event }: Props) {
    return (
        <Box className="inline-flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-gray-400 p-4 text-white">
            <Image
                src="/images/facebook.png"
                width="50"
                height="50"
                alt="temp"
            />
        </Box>
    )
}
