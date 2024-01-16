/* eslint-disable */
// Libraries
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
// Components
import * as Form from '@radix-ui/react-form'
import { TextField, Strong, Text } from '@radix-ui/themes'
import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path
} from 'react-hook-form'
import { useEffect, useState } from 'react'

interface Props<T extends FieldValues> {
    label: string
    name: Path<T>
    control: Control<T>
    onSelect: (
        address: string,
        latitude: number,
        longitude: number,
        city: string
    ) => void
    error?: FieldError
    placeHolder?: string
    required?: boolean | string
    initialValue?: string
}

export default function PlacesAutocomplete<T extends FieldValues>({
    label,
    name,
    initialValue,
    placeHolder,
    onSelect,
    error,
    control,
    required = false
}: Props<T>): JSX.Element {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
            // locationRestriction: {
            //     latLng: { lat: () => 43.65107, lng: () => -79.347015 },
            //     radius: 2800 * 1000, // approximately radius to cover the whole Canada
            // },
        },
        debounce: 300
    })
    useEffect(() => {
        setValue(initialValue ?? '')
    }, [initialValue, setValue])

    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions()
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update the keyword of the input element
        setValue(e.target.value)
    }

    const handleSelect = async ({ description }: { description: string }) => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false)
        clearSuggestions()

        // Get latitude and longitude via utility functions
        const results = await getGeocode({ address: description })
        const { lat, lng } = getLatLng(results[0])
        const city =
            results[0]?.address_components[3]?.long_name || 'city unknonw'
        onSelect(description, lat, lng, city)
    }

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text }
            } = suggestion

            const select = async () => {
                await handleSelect(suggestion)
            }

            return (
                <li key={place_id} onKeyDown={select} onClick={select}>
                    <Strong>{main_text}</Strong> <Text>{secondary_text}</Text>
                </li>
            )
        })

    return (
        <Controller
            control={control}
            rules={{ required }}
            name={name}
            render={({ field }) => (
                <Form.Field ref={ref} name={name}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control asChild>
                        <TextField.Input
                            value={value}
                            onChange={(event) => {
                                handleInput(event)
                            }}
                            disabled={!ready}
                            placeholder={placeHolder}
                            onBlur={field.onBlur}
                        />
                    </Form.Control>
                    {/* We can use the "status" to decide whether we should display the dropdown or not */}
                    {status === 'OK' && <ul>{renderSuggestions()}</ul>}
                    {error && (
                        <Text size="2" color="red">
                            {error.message}
                        </Text>
                    )}
                </Form.Field>
            )}
        />
    )
}
