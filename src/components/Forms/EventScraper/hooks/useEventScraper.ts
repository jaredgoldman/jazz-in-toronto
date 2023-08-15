import { useState } from 'react'
import { api } from '~/utils/api'
import { useForm } from 'react-hook-form'
import { startOfMonth } from 'date-fns'

export default function useEventScraper() {
    const [error, setError] = useState<string>('')
    const { isLoading, mutate, data, isSuccess } =
        api.event.getVenueEvents.useMutation()

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
        formState: { errors }
    } = useForm({ defaultValues })

    const submit = handleSubmit((data) => {
        try {
            mutate(data)
        } catch (error) {
            setError('Ooops, there was a problem with your scrape query')
        }
    })

    return {
        submit,
        isLoading,
        control,
        errors,
        data,
        isSuccess,
        error
    }
}
