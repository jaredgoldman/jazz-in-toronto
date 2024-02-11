import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { Artist, Venue } from '~/types/data'
import { isArtist, isVenue } from '~/utils/typeguards'
import { parseISO } from 'date-fns'
import { useToast } from '~/hooks/useToast'
import { useMemo } from 'react'

export interface EventFormValues {
    name: string
    startDate: string
    endDate: string
    artistId: string
    instagramHandle?: string
    website?: string
    description?: string
    venueId: string
    featured: boolean
}

export const toDateTimeLocal = (date: Date): string => {
    // Pad function to ensure single digits are preceded by a 0
    const pad = (number: number): string =>
        number < 10 ? `0${number}` : number.toString()
    // Format the date to YYYY-MM-DD
    const formattedDate = `${date.getFullYear()}-${pad(
        date.getMonth() + 1
    )}-${pad(date.getDate())}`
    // Format the time to HH:MM
    const formattedTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`
    // Combine both date and time
    return `${formattedDate}T${formattedTime}`
}

export default function useEventForm(id?: string) {
    const { toast } = useToast()

    const getAllVenueQuery = api.venue.getAll.useQuery()
    const getAllArtistQuery = api.artist.getAll.useQuery()
    const createEventMutation = api.event.create.useMutation()
    const updateEventMutation = api.event.update.useMutation()

    const isLoading = useMemo(
        () => getAllVenueQuery.isLoading || getAllArtistQuery.isLoading,
        [getAllVenueQuery.isLoading, getAllArtistQuery.isLoading]
    )

    const isSubmitting = useMemo(
        () => createEventMutation.isLoading || updateEventMutation.isLoading,
        [createEventMutation.isLoading, updateEventMutation.isLoading]
    )

    const defaultValues: EventFormValues = {
        name: '',
        startDate: toDateTimeLocal(new Date()),
        endDate: toDateTimeLocal(new Date()),
        artistId: '',
        venueId: '',
        instagramHandle: '',
        website: '',
        featured: false,
        description: ''
    }

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<EventFormValues>({ defaultValues })

    const onSubmit = async (values: EventFormValues) => {
        try {
            if (id) {
                await updateEventMutation.mutateAsync({
                    ...values,
                    id,
                    startDate: parseISO(values.startDate),
                    endDate: parseISO(values.endDate)
                })
            } else {
                await createEventMutation.mutateAsync({
                    ...values,
                    startDate: parseISO(values.startDate),
                    endDate: parseISO(values.endDate)
                })
            }
            toast({
                title: 'Success',
                message: 'Event successfully submitted!'
            })
        } catch (e) {
            toast({
                title: 'Error',
                message: 'There was an error submitting. Please try again',
                type: 'error'
            })
        }
    }

    const submit = handleSubmit(async (data) => {
        await onSubmit(data)
    })

    return {
        venueData: getAllVenueQuery.data ?? [],
        artistData: getAllArtistQuery.data ?? [],
        submit,
        isSubmitting,
        isLoading,
        errors,
        control,
        reset
    }
}
