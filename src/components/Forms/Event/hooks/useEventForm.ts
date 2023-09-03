import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import {
    type EventWithArtistVenue,
    type Artist,
    type Venue
} from '~/types/data'
import { isArtist, isVenue } from '~/utils/typeguards'

export interface EventFormValues {
    name: string
    startDate: Date
    endDate: Date
    artistId: string
    instagramHandle?: string
    website?: string
    venueId: string
    featured: boolean
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
              instagramHandle: currentValues.instagramHandle || undefined,
              website: currentValues.website || undefined
          }
        : {
              name: '',
              startDate: new Date(),
              endDate: new Date(),
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
        formState: { errors }
    } = useForm<EventFormValues>({ defaultValues })

    const onSubmit = async (values: EventFormValues) => {
        try {
            if (isEditing && currentValues && editEventMutation) {
                await editEventMutation({
                    id: currentValues?.id,
                    ...values
                })
            } else if (eventMutation) {
                await eventMutation(values)
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
        getSpecificArtistData
    }
}
