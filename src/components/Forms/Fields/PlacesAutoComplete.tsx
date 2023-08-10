/* eslint-disable */
// Components
import {
    Field,
    ErrorMessage,
    type FieldInputProps,
    type FormikProps
} from 'formik'
// Libraries
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'

interface Props {
    label: string
    name: string
    className?: string
    fieldClassName?: string
    placeHolder?: string
}

export default function PlacesAutoCompleteField({
    label,
    name,
    className = 'flex-col mb-5',
    fieldClassName = 'border-2 border-black',
    placeHolder = "Enter your venue's location"
}: Props): JSX.Element {
    return (
        <div className={className}>
            <label>{label}</label>
            <Field
                className={fieldClassName}
                name={name}
                component={PlacesAutocomplete}
                props={{ placeHolder }}
            />
            <ErrorMessage name={name} component="div" />
        </div>
    )
}

interface PlacesAutoCompleteProps {
    form: FormikProps<string>
    field: FieldInputProps<string>
    props: {
        placeHolder: string
    }
}

const PlacesAutocomplete = ({
    form,
    props
}: PlacesAutoCompleteProps): JSX.Element => {
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
        await form.setFieldValue('address', description)
        await form.setFieldValue('latitude', lat)
        await form.setFieldValue('longitude', lng)
        await form.setFieldValue(
            'city',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            results[0].address_components[3].long_name
        )
    }

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text }
            } = suggestion

            return (
                <li
                    key={place_id}
                    onClick={async () => {
                        await handleSelect(suggestion)
                    }}
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            )
        })

    return (
        <div ref={ref}>
            <input
                className="w-full text-black"
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder={props.placeHolder}
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === 'OK' && <ul>{renderSuggestions()}</ul>}
        </div>
    )
}
