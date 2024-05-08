import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { useToast } from '~/hooks/useToast'
import { useMemo } from 'react'
import { EventWithArtistVenue } from '~/types/data'
import { DateTime } from 'luxon'
import { setFormValues } from '../../utils'

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

export default function useEventForm(id = '', isAdmin: boolean) {
    const { toast } = useToast()

    const getAllVenueQuery = api.venue.getAll.useQuery()
    const getAllArtistQuery = api.artist.getAll.useQuery()
    const createEventMutation = api.event.create.useMutation()
    const updateEventMutation = api.event.update.useMutation()
    const getEventQuery = api.event.get.useQuery(
        { id },
        { enabled: !!id, staleTime: Infinity, cacheTime: Infinity }
    )

    const isLoading = useMemo(
        () =>
            getAllVenueQuery.isLoading ||
            getAllArtistQuery.isLoading ||
            getEventQuery.isFetching,
        [
            getAllVenueQuery.isLoading,
            getAllArtistQuery.isLoading,
            getEventQuery.isFetching
        ]
    )

    const isSubmitting = useMemo(
        () => createEventMutation.isLoading || updateEventMutation.isLoading,
        [createEventMutation.isLoading, updateEventMutation.isLoading]
    )

    const hasSubmitted = useMemo(
        () =>
            (createEventMutation.isSuccess || updateEventMutation.isSuccess) &&
            // Enable admins to submit multiple times
            !isAdmin,
        [createEventMutation.isSuccess, updateEventMutation.isSuccess, isAdmin]
    )

    const defaultValues: EventFormValues = {
        name: '',
        startDate: toDateTimeLocal(
            DateTime.now().setZone('America/New_York').toJSDate()
        ),
        endDate: toDateTimeLocal(
            DateTime.now().setZone('America/New_York').toJSDate()
        ),
        artistId: '',
        venueId: '',
        instagramHandle: '',
        website: '',
        featured: false,
        description: ''
    }

    const {
        reset,
        watch,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<EventFormValues>({ defaultValues })

    useEffect(() => {
        const data = getEventQuery.data
        if (data) {
            delete (data as Partial<EventWithArtistVenue>).id
            const startDate = DateTime.fromJSDate(data.startDate)
                .setZone('America/New_York')
                .toJSDate()
            const endDate = DateTime.fromJSDate(data.endDate)
                .setZone('America/New_York')
                .toJSDate()

            reset({
                ...data,
                instagramHandle: data.instagramHandle ?? '',
                website: data.website ?? '',
                description: data.description ?? '',
                startDate: toDateTimeLocal(startDate),
                endDate: toDateTimeLocal(endDate),
                artistId: data.artistId,
                venueId: data.venueId
            })
        }
    }, [getEventQuery.data, reset])

    const watchedVenueId = watch('venueId')

    useEffect(() => {
        if (watchedVenueId) {
            const venue = getAllVenueQuery.data?.find(
                (v) => v.id === watchedVenueId
            )
            setFormValues(
                {
                    website: venue?.website,
                    instagramHandle: venue?.instagramHandle ?? ''
                },
                setValue
            )
        }
    }, [watchedVenueId])

    const onSubmit = async (values: EventFormValues) => {
        const startDate = DateTime.fromISO(values.startDate)
            .setZone('America/New_York')
            .toJSDate()

        const endDate = DateTime.fromISO(values.endDate)
            .setZone('America/New_York')
            .toJSDate()

        console.log({
            startDate,
            endDate
        })

        try {
            if (id) {
                await updateEventMutation.mutateAsync({
                    ...values,
                    id,
                    startDate,
                    endDate
                })
            } else {
                await createEventMutation.mutateAsync({
                    ...values,
                    startDate,
                    endDate,
                    isApproved: isAdmin
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
        hasSubmitted,
        isLoading,
        errors,
        control,
        reset
    }
}
