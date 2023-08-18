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

    const eventMutation = api.event.create.useMutation()
    const editEventMutation = api.event.update.useMutation()

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
              website: ''
          }

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors }
    } = useForm<EventFormValues>({ defaultValues })

    const onSubmit = async (values: EventFormValues) => {
        try {
            if (isEditing && currentValues && editEventMutation) {
                await editEventMutation.mutateAsync({
                    id: currentValues?.id,
                    ...values
                })
            } else if (eventMutation) {
                await eventMutation.mutateAsync(values)
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

    const submit = handleSubmit(async (data) => {
        await onSubmit(data)
    })

    return {
        isEditing,
        venueData,
        artistData,
        eventMutation,
        editEventMutation,
        submit,
        onAddArtist,
        onAddVenue,
        isLoading,
        register,
        error,
        errors,
        setValue,
        control
    }
}
