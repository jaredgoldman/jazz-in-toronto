import { useEffect, useState } from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { env } from '~/env.mjs'
import { api } from '~/utils/api'
import { Flex, Text } from '@radix-ui/themes'
import { MapVenuePopover } from './components'
import Loading from '../Loading'

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
    const { data, isLoading } = api.event.getAllByDayByVenue.useQuery({
        date: selectedDate
    })

    const [popoverState, setPopoverState] = useState<Record<string, boolean>>(
        {}
    )

    useEffect(() => {
        if (data) {
            const newState = data.reduce((acc, { venue }) => {
                acc[venue.id] = false
                return acc
            }, {} as Record<string, boolean>)
            setPopoverState(newState)
        }
    }, [data])

    /**
     * Change each popovers visibility to false and update the selected popover
     * @param {string} venueId
     */
    const handleChangePopoverState = (venueId: string) => {
        setPopoverState((prevState) => {
            // Create a new state object with all values set to false
            const allFalseState = Object.keys(prevState).reduce((acc, key) => {
                acc[key] = false
                return acc
            }, {} as Record<string, boolean>)

            return {
                ...allFalseState,
                [venueId]: !prevState[venueId]
            }
        })
    }

    return (
        <Flex direction="column" width="100%">
            <Text size="4" mb="1">
                Click a marker to see the respective venues events
            </Text>
            <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_API_KEY}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Map
                        zoom={12}
                        center={{
                            lat: 43.66,
                            lng: -79.4163
                        }}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        zoomControl={true}
                        clickableIcons={false}
                    >
                        {data?.map(({ venue, events }) => (
                            <Flex pl="2" key={venue.id}>
                                <MapVenuePopover
                                    events={events}
                                    venue={venue}
                                    visible={popoverState[venue.id] ?? false}
                                    handleChangePopoverState={
                                        handleChangePopoverState
                                    }
                                >
                                    <></>
                                </MapVenuePopover>
                                <Marker
                                    title={venue.name}
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
                )}
            </APIProvider>
        </Flex>
    )
}
