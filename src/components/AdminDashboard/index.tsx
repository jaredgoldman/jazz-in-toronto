// Components
import { Grid, Box } from '@radix-ui/themes'
import StatBox from './components/StatBox'
// Types
import { DataType } from '~/types/enums'

interface Props {
    data: {
        upcomingEventsCount: number
        allEventsCount: number
        eventsThisWeekCount: number
        bandCount: number
        venueCount: number
    }
}

export default function AdminDashboard({ data }: Props): JSX.Element {
    return (
        <Box m="auto">
            <Grid
                gap="8"
                columns="2"
                rows="2"
                p="4"
                justify="center"
                align="center"
            >
                <StatBox
                    label="Upcoming Events"
                    data={data.upcomingEventsCount}
                    dataType={DataType.EVENT}
                />
                <StatBox
                    label="All Events"
                    data={data.allEventsCount}
                    dataType={DataType.EVENT}
                />
                <StatBox
                    label="Events This Week"
                    data={data.eventsThisWeekCount}
                    dataType={DataType.EVENT}
                />
                <StatBox
                    label="All Artists"
                    data={data.bandCount}
                    dataType={DataType.BAND}
                />
                <StatBox
                    label="All Venues"
                    data={data.venueCount}
                    dataType={DataType.VENUE}
                />
            </Grid>
        </Box>
    )
}
