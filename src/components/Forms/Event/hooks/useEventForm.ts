import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import {
    EventWithArtistVenue,
    Artist,
    Venue
} from '~/types/data'
import { isArtist, isVenue } from '~/utils/typeguards'
import { parseISO } from 'date-fns'

export interface EventFormValues {
    name: string
    startDate: string
    endDate: string
    artistId: string
    instagramHandle?: string
    website?: string
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

export default function useEventForm(currentValues?: EventWithArtistVenue) {
    const [error, setError] = useState<string>('')

    const {
        data: venueData,
        refetch: refetchVenues,
        isLoading: venuesLoading
    } = api.venue.getAll.useQuery()

    const {
        data: artistData,
        refetch: refetchArtists,
        isLoading: artistsLoading
    } = api.artist.getAll.useQuery()

    const { mutateAsync: eventMutation, isSuccess: eventMutationIsSuccess } =
        api.event.create.useMutation()
    const {
        mutateAsync: editEventMutation,
        isSuccess: editEventMutationIsSuccess
    } = api.event.update.useMutation()

    const isLoading = venuesLoading || artistsLoading
    const isEditing = !!currentValues
    const defaultValues: EventFormValues = currentValues
        ? {
              ...currentValues,
              startDate: toDateTimeLocal(new Date(currentValues?.startDate)),
              endDate: toDateTimeLocal(new Date(currentValues?.endDate)),
              instagramHandle: currentValues.instagramHandle || undefined,
              website: currentValues.website || undefined,
              featured: currentValues.featured || false
          }
        : {
              name: '',
              startDate: toDateTimeLocal(new Date()),
              endDate: toDateTimeLocal(new Date()),
              artistId: '',
              venueId: '',
              instagramHandle: '',
              website: '',
              featured: false
          }

    const {
        register,
        handleSubmit,
        setValue,
        control,
        getValues,
        reset,
        formState: { errors }
    } = useForm<EventFormValues>({ defaultValues })

    const onSubmit = async (values: EventFormValues) => {
        try {
            if (isEditing && currentValues && editEventMutation) {
                await editEventMutation({
                    ...values,
                    id: currentValues?.id,
                    startDate: parseISO(values.startDate),
                    endDate: parseISO(values.endDate)
                })
            } else if (eventMutation) {
                await eventMutation({
                    ...values,
                    startDate: parseISO(values.startDate),
                    endDate: parseISO(values.endDate)
                })
            }
        } catch (e) {
            setError('There was an error submitting. Please try again')
        }
    }

    // TODO: Factor into single function
    const onAddArtist = async (value: Artist | Venue) => {
        if (isArtist(value)) {
            await refetchArtists()
            setValue('artistId', value.id)
        }
    }
    const onAddVenue = async (value: Artist | Venue) => {
        if (isVenue(value)) {
            await refetchVenues()
            setValue('venueId', value.id)
        }
    }

    // Grab the specific artist data from the artist data array
    // Helpful when editing an event in state in the eventScraper
    const getSpecificArtistData = () => {
        if (artistData) {
            return artistData.filter(
                (artist) => artist.id === getValues().artistId
            )[0]
        }
    }

    const submit = handleSubmit(async (data) => {
        await onSubmit(data)
    })

    return {
        isEditing,
        venueData,
        artistData,
        eventMutationIsSuccess,
        editEventMutationIsSuccess,
        submit,
        onAddArtist,
        onAddVenue,
        isLoading,
        register,
        error,
        errors,
        setValue,
        getValues,
        control,
        getSpecificArtistData,
        reset
    }
}
