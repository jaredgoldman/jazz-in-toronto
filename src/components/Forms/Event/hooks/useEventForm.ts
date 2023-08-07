import { useState } from 'react'
import { api } from '~/utils/api'
import { type Values } from '../index'
import { type EventWithBandVenue } from '~/types/data'

export default function useEventForm(currentValues?: EventWithBandVenue) {
    const [error, setError] = useState<string>('')
    const { data: venueData } = api.venue.getAll.useQuery()
    const { data: bandData } = api.band.getAll.useQuery()

    const eventMutation = api.event.create.useMutation()
    const editEventMutation = api.event.update.useMutation()

    const isEditing = !!currentValues
    const initialValues: Values = currentValues
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

    return {
        initialValues,
        isEditing,
        venueData,
        bandData,
        eventMutation,
        editEventMutation,
        error,
        setError
    }
}
