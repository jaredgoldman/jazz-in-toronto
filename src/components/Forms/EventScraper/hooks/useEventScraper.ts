// Libraires
import { useState } from 'react'
import { startOfMonth } from 'date-fns'
// Utils
import { api } from '~/utils/api'
// Hooks
import { useForm } from 'react-hook-form'

export default function useEventScraper() {
    const { data: venues, isLoading: isLoadingVenues } =
        api.venue.getAllCrawlable.useQuery()
    const { data: artists, isLoading: artistsLoading } =
        api.artist.getAll.useQuery()

    const [error, setError] = useState<string>('')
    const {
        isLoading: isLoadingMutation,
        mutate,
        data,
        isSuccess
    } = api.event.getVenueEvents.useMutation()

    const defaultValues = {
        venueId: '',
        /* Ensure to always query the start of month here
         * So that our query for the hashed venue content
         * ensures processing will not run if no events have changed
         */
        date: startOfMonth(new Date())
    }

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch
    } = useForm({ defaultValues })

    const venueId = watch('venueId')

    const submit = handleSubmit((data) => {
        try {
            mutate(data)
        } catch (error) {
            setError('Ooops, there was a problem with your scrape query')
        }
    })

    const isLoading = isLoadingVenues || artistsLoading

    return {
        submit,
        isLoading,
        isLoadingMutation,
        control,
        errors,
        data,
        isSuccess,
        error,
        venueId,
        venues,
        artists
    }
}
