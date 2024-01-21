import { useState } from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { env } from '~/env.mjs'
import { api } from '~/utils/api'
import startOfDay from 'date-fns/startOfDay'
import { Flex, Text } from '@radix-ui/themes'
import { EventWithArtistVenue } from '~/types/data'
import { EventsMapModal } from './components'

type Props = {
    selectedDate: Date
}
export const EventsMap = ({ selectedDate }: Props) => {
    const { data } = api.event.getAllByDayByVenue.useQuery({
        date: startOfDay(selectedDate)
    })

    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<{
        venueName: string
        events: EventWithArtistVenue[]
    }>({
        venueName: '',
        events: []
    })

    const handleMarkerHover = (
        events: EventWithArtistVenue[],
        venueName: string
    ) => {
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
            <Text size="4" mb="1">
                Hover over a marker to see the respective venues events
            </Text>
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
                                onMouseOver={() =>
                                    handleMarkerHover(events, venue.name)
                                }
                                onMouseOut={handleMarkerHoverOut}
                            />
                        ))}
                        {showModal && <EventsMapModal {...modalContent} />}
                    </>
                </Map>
            </APIProvider>
        </Flex>
    )
}
