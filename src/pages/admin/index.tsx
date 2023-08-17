// Componenets
import Loading from '~/components/Loading'
import AdminLayout from '~/layouts/AdminLayout'
import { Flex, Text, Heading, Strong, Grid } from '@radix-ui/themes'
// Utils
import { api } from '~/utils/api'

export default function AdminHome() {
    const { data, isLoading } = api.data.getStats.useQuery()
    return (
        <AdminLayout pageTitle="Jazz In Toronto | Admin - Bands">
            <Heading mt="2" mb="7" align="center">
                Dashboard
            </Heading>
            {isLoading && <Loading />}
            {data && (
                <Flex justify="center">
                    <Grid
                        gap="8"
                        columns="2"
                        rows="2"
                        p="4"
                        justify="center"
                        align="center"
                    >
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                        >
                            <Heading mb="4">Upcoming events: </Heading>
                            <Text>{data.upcomingEventsCount}</Text>
                        </Flex>
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                        >
                            <Heading mb="4">Events booked all time: </Heading>
                            <Text>{data.allEventsCount}</Text>
                        </Flex>
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                        >
                            <Heading mb="4">Artists: </Heading>
                            <Text>{data.bandCount}</Text>
                        </Flex>
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                        >
                            <Heading mb="4">Venues: </Heading>
                            <Text>{data.venueCount}</Text>
                        </Flex>
                    </Grid>
                </Flex>
            )}
        </AdminLayout>
    )
}
