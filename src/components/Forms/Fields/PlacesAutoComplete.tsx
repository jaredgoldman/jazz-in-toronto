import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { FieldProps, Field, ErrorMessage } from 'formik'

interface PlacesAutoCompleteProps {
    label: string
    name: string
    className?: string
    fieldClassName?: string
}

export default function PlacesAutoCompleteField({
    label,
    name,
    className = 'flex-col m-2',
    fieldClassName = 'mb-5 border-2 border-black'
}: PlacesAutoCompleteProps): JSX.Element {
    return (
        <div className={className}>
            <label>{label}</label>
            <Field
                className={fieldClassName}
                name={name}
                component={PlacesAutocomplete}
            />
            <ErrorMessage name={name} component="div" />
        </div>
    )
}

const PlacesAutocomplete = ({
    form,
    field
}: FieldProps<Date, any>): JSX.Element => {
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

    const handleInput = (e: any) => {
        // Update the keyword of the input element
        setValue(e.target.value)
    }

    const handleSelect =
        ({ description }: { description: string }) =>
        () => {
            // When user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false)
            clearSuggestions()

            // Get latitude and longitude via utility functions
            getGeocode({ address: description }).then((results) => {
                const { lat, lng } = getLatLng(results[0])
                form.setFieldValue('address', description)
                form.setFieldValue('latitude', lat)
                form.setFieldValue('longitude', lng)
                form.setFieldValue(
                    'city',
                    results[0].address_components[3].long_name
                )
            })
        }

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text }
            } = suggestion

            return (
                <li key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            )
        })

    return (
        <div ref={ref}>
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Where are you going?"
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === 'OK' && <ul>{renderSuggestions()}</ul>}
        </div>
    )
}
