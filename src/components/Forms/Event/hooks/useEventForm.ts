import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { type EventWithBandVenue, type Band, type Venue } from '~/types/data'
import { isBand, isVenue } from '~/utils/typeguards'

export interface EventFormValues {
    name: string
    startDate: Date
    endDate: Date
    bandId: string
    instagramHandle?: string
    website?: string
    venueId: string
}

export default function useEventForm(currentValues?: EventWithBandVenue) {
    const [error, setError] = useState<string>('')
    const [added, setAdded] = useState<{ band: boolean; venue: boolean }>({
        band: false,
        venue: false
    })

    const {
        data: venueData,
        refetch: refetchVenues,
        isLoading: venuesLoading
    } = api.venue.getAll.useQuery()

    const {
        data: bandData,
        refetch: refetchBands,
        isLoading: bandsLoading
    } = api.band.getAll.useQuery()

    const eventMutation = api.event.create.useMutation()
    const editEventMutation = api.event.update.useMutation()

    const isLoading = venuesLoading || bandsLoading
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
              bandId: '',
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
        console.log('VALUES', values)
        // handle errors
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
    const onAddBand = async (value: Band | Venue) => {
        if (isBand(value)) {
            await refetchBands()
            setAdded((prev) => ({ ...prev, band: true }))
        }
    }
    const onAddVenue = async (value: Band | Venue) => {
        if (isVenue(value)) {
            await refetchVenues()
            setAdded((prev) => ({ ...prev, venue: true }))
        }
    }

    const submit = handleSubmit((data) => {
        onSubmit(data)
    })

    return {
        isEditing,
        venueData,
        bandData,
        eventMutation,
        editEventMutation,
        submit,
        added,
        onAddBand,
        onAddVenue,
        isLoading,
        register,
        error,
        errors,
        setValue,
        control
    }
}
