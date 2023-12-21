import { api } from '~/utils/api'
import { Box, Grid } from '@radix-ui/themes'
import Action from './components/Action'

export default function AdminControls() {
    const { mutate } = api.event.emailUnapproved.useMutation()

    const handleEmailUnapprovedEvents = () => {
        mutate()
    }

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
                <Action
                    label="Email Unapproved Events"
                    description="Send an email notification to all admins with unapproved events"
                    buttonLabel="Send notifications"
                    action={handleEmailUnapprovedEvents}
                />
            </Grid>
        </Box>
    )
}
