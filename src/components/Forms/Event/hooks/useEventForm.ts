import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '~/hooks/useToast'
import { useMemo } from 'react'
import { EventWithArtistVenue } from '~/types/data'
import { DateTime } from 'luxon'
import { setFormValues } from '../../utils'
import { toDateTimeLocal, api } from '~/utils'

export interface EventFormValues {
    name: string
    startDate: string
    endDate: string
    artistId: string
    instagramHandle?: string
    website?: string
    description?: string
    venueId: string
    email?: string
    featured: boolean
    approved: boolean
}

export default function useEventForm(id = '', isAdmin: boolean) {
    const { toast } = useToast()

    const querySettings = {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    }

    const getAllVenueQuery = api.venue.getAll.useQuery(undefined, querySettings)
    const getAllArtistQuery = api.artist.getAll.useQuery(
        undefined,
        querySettings
    )
    const createEventMutation = api.event.create.useMutation()
    const updateEventMutation = api.event.update.useMutation()
    const getEventQuery = api.event.get.useQuery(
        { id },
        {
            enabled: !!id,
            ...querySettings
        }
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
        email: undefined,
        featured: false,
        description: '',
        approved: isAdmin ? true : false
    }

    const {
        reset,
        watch,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<EventFormValues>({
        defaultValues
    })

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
                venueId: data.venueId,
                email: data.email ?? undefined
            })
        }
    }, [getEventQuery.data, reset])

    const watchedVenueId = watch('venueId')
    const watchedStartDate = watch('startDate')

    // Changes the website and instagram handle when the venue changes
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
    }, [watchedVenueId, getAllVenueQuery.data, setValue])

    // Automatically sets the end date to 2 hours after the start date
    useEffect(() => {
        if (watchedStartDate) {
            const startDate = DateTime.fromISO(watchedStartDate)
                .setZone('America/New_York')
                .toJSDate()
            const endDate = DateTime.fromJSDate(startDate)
                .plus({ hours: 2 })
                .toJSDate()
            setValue('endDate', toDateTimeLocal(endDate))
        }
    }, [watchedStartDate, setValue])

    const onSubmit = async (values: EventFormValues) => {
        const startDate = DateTime.fromISO(values.startDate)
            .setZone('America/New_York')
            .toJSDate()

        const endDate = DateTime.fromISO(values.endDate)
            .setZone('America/New_York')
            .toJSDate()

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
                    endDate
                })
            }
            const toastAction = id ? 'edited' : 'submitted'
            toast({
                title: 'Success',
                message: `Event successfully ${toastAction}! Your submission will be reviewed by our admins before it is published`
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
