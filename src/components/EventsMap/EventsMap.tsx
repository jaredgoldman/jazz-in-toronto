import { useState } from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { env } from '~/env.mjs'
import { api } from '~/utils/api'
import startOfDay from 'date-fns/startOfDay'
import { Flex, Text } from '@radix-ui/themes'
import { EventWithArtistVenue } from '~/types/data'
import { EventsMapModal } from './components'

/**
 * Props for the EventsMap component
 * @param selectedDate - The date selected by the user
 */
type Props = {
    selectedDate: Date
}

/**
 * Responsable for rendering the map with events markers and
 * the modal with the events of the selected venue
 * @param {Props}-
 */
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
                            />
                        ))}
                        {showModal && (
                            <EventsMapModal
                                {...modalContent}
                                onClose={() => setShowModal(false)}
                            />
                        )}
                    </>
                </Map>
            </APIProvider>
        </Flex>
    )
}
