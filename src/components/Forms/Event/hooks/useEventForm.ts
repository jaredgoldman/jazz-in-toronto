import { useState, useRef } from 'react'
import { api } from '~/utils/api'
import { type EventWithBandVenue, type Band, type Venue } from '~/types/data'
import { type FormikContextType, type FormikHelpers } from 'formik'
import { isBand, isVenue } from '~/utils/typeguards'

export interface Values {
    name: string
    startDate: Date
    endDate: Date
    bandId: string
    instagramHandle?: string
    website?: string
    venueId: string
}

interface Errors {
    name?: string
    startDate?: string
    endDate?: string
    bandId?: string
    instagramHandle?: string
    website?: string
    venueId?: string
}

export default function useEventForm(currentValues?: EventWithBandVenue) {
    const formikRef = useRef<FormikContextType<Values>>(null)
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

    const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
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
            actions.setSubmitting(false)
            setError('There was an error submitting. Please try again')
        }
    }

    const validate = (values: Values) => {
        const errors: Errors = {}
        if (!values.name) {
            errors.name = 'Required'
        }
        if (!values.venueId) {
            errors.venueId = 'Required'
        }
        if (!values.bandId) {
            errors.bandId = 'Required'
        }
        if (!values.startDate) {
            errors.startDate = 'Required'
        }
        if (!values.endDate) {
            errors.endDate = 'Required'
        }

        return errors
    }

    // TODO: Factor into single function
    const onAddBand = async (value: Band | Venue) => {
        if (isBand(value)) {
            await refetchBands()
            await formikRef.current?.setFieldValue('bandId', value.id)
            setAdded((prev) => ({ ...prev, band: true }))
        }
    }
    const onAddVenue = async (value: Band | Venue) => {
        if (isVenue(value)) {
            await refetchVenues()
            await formikRef.current?.setFieldValue('venueId', value.id)
            setAdded((prev) => ({ ...prev, venue: true }))
        }
    }

    return {
        initialValues,
        isEditing,
        venueData,
        bandData,
        eventMutation,
        editEventMutation,
        error,
        setError,
        onSubmit,
        validate,
        added,
        onAddBand,
        onAddVenue,
        formikRef,
        isLoading
    }
}
