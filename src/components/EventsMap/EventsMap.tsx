import { useEffect, useState } from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { env } from '~/env.mjs'
import { api } from '~/utils/api'
import { Flex, Text } from '@radix-ui/themes'
import { MapVenuePopover } from './components'

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
        date: selectedDate
    })

    const [popoverState, setPopoverState] = useState<Record<string, boolean>>(
        {}
    )

    useEffect(() => {
        // TODO: make sure we only do this when we have to
        if (data) {
            const newState = data.reduce((acc, { venue, events }) => {
                acc[venue.id] = false
                return acc
            }, {} as Record<string, boolean>)

            setPopoverState(newState)
        }
    }, [data])

    const handleChangePopoverState = (venueId: string) => {
        setPopoverState((prevState) => ({
            ...prevState,
            [venueId]: !prevState[venueId]
        }))
    }

    return (
        <Flex direction="column" width="100%">
            <Text size="4" mb="1">
                Click a marker to see the respective venues events
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
                    {data?.map(({ venue, events }) => (
                        <Flex pl="2">
                            <MapVenuePopover
                                events={events}
                                venue={venue}
                                key={`popover-${venue.id}`}
                                visible={popoverState[venue.id] ?? false}
                                onFocusOutside={() =>
                                    handleChangePopoverState(venue.id)
                                }
                            >
                                <></>
                            </MapVenuePopover>
                            <Marker
                                title={venue.name}
                                key={`marker-${venue.id}`}
                                position={{
                                    lng: venue.longitude,
                                    lat: venue.latitude
                                }}
                                onClick={() =>
                                    handleChangePopoverState(venue.id)
                                }
                            />
                        </Flex>
                    ))}
                </Map>
            </APIProvider>
        </Flex>
    )
}
