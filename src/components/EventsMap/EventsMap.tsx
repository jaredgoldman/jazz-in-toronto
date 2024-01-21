import { useState } from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { env } from '~/env.mjs'
import { api } from '~/utils/api'
import startOfDay from 'date-fns/startOfDay'
import { Flex, Heading } from '@radix-ui/themes'
import { EventWithArtistVenue } from '~/types/data'
import { format } from 'date-fns'

type Props = {
    venueName: string
    events: EventWithArtistVenue[]
}

const CustomModal = ({ venueName, events }: Props) => (
    <Flex
        position="relative"
        top="0"
        left="0"
        height="100%"
        p="2"
        direction="column"
        className="z-50 w-1/3 border-r border-slate-300 bg-slate-100/70 text-black"
    >
        <Heading mb="3">{`Today @ ${venueName}`}</Heading>
        <Flex direction="column">
            {events.map((event) => (
                <Flex>{`${event.artist.name} @ ${format(
                    event.startDate,
                    'h:mm a'
                )}`}</Flex>
            ))}
        </Flex>
    </Flex>
)

export const EventsMap = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<{
        venueName: string
        events: EventWithArtistVenue[]
    }>({
        venueName: '',
        events: []
    })

    const { data } = api.event.getAllByDayByVenue.useQuery({
        date: startOfDay(new Date())
    })

    const handleMarkerClick = (event: any) => {
        // Handle marker click event here
        console.log(event)
    }

    const handleMarkerHover = (
        events: EventWithArtistVenue[],
        venueName: string
    ) => {
        // Show the modal on hover and set its position and text
        setModalContent({
            venueName,
            events
        })
        setShowModal(true)
    }

    const handleMarkerHoverOut = () => {
        // Hide the modal when mouse leaves the marker
        setShowModal(false)
    }

    return (
        <Flex direction="column" width="100%">
            <Heading size="9" mb="6">
                Daily Events Map
            </Heading>
            <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_API_KEY}>
                <Map
                    zoom={12}
                    center={{
                        lat: 43.66,
                        lng: -79.4163
                    }}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    zoomControl={true}
                >
                    <>
                        {data?.map(({ venue, events }) => (
                            <Marker
                                title={venue.name}
                                key={venue.id}
                                clickable={false}
                                position={{
                                    lng: venue.longitude,
                                    lat: venue.latitude
                                }}
                                onClick={handleMarkerClick}
                                onMouseOver={() =>
                                    handleMarkerHover(events, venue.name)
                                }
                                onMouseOut={handleMarkerHoverOut}
                            />
                        ))}
                        {showModal && <CustomModal {...modalContent} />}
                    </>
                </Map>
            </APIProvider>
        </Flex>
    )
}
