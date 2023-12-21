// Components
import { Select } from '../Fields'
import SearchTable from '~/components/SearchContainer/components/SearchTable'
import FormLayout from '~/layouts/FormLayout'
import { Heading, Button, Flex, Text } from '@radix-ui/themes'
import DatePickerField from '../Fields/DatePicker'
import Loading from '~/components/Loading'
import * as Form from '@radix-ui/react-form'
// Types
import { DataType } from '~/types/enums'
// Hooks
import useEventScraper from './hooks/useEventScraper'

export default function EventScraper(): JSX.Element {
    const {
        submit,
        isLoading,
        control,
        error,
        errors,
        data,
        isSuccess,
        venueId,
        venues,
        artists
    } = useEventScraper()

    return (
        <FormLayout isLoading={isLoading}>
            <Flex align="center" direction="column" grow="1">
                <Form.Root onSubmit={submit} className="max-w-7xl">
                    <Heading mb="5">Event Scraper</Heading>
                    <DatePickerField
                        name="date"
                        label="Select a month to scrape"
                        error={errors.date}
                        control={control}
                        datePickerProps={{
                            dateFormat: 'MM/yyyy',
                            showMonthYearPicker: true,
                            showPreviousMonths: false
                        }}
                    />
                    {venues && (
                        <Select
                            name="venueId"
                            label="Select a venue to scrape"
                            control={control}
                            optionData={venues}
                            error={errors.venueId}
                            required="You must select a venue to scrape"
                        />
                    )}
                    <Flex width="100%" justify="center" mt="5">
                        <Form.Submit asChild>
                            <Button>Scrape Events</Button>
                        </Form.Submit>
                        <Button ml="2">Add Artists</Button>
                    </Flex>
                </Form.Root>
                {error && (
                    <Text size="2" color="red">
                        {error}
                    </Text>
                )}
                {isLoading && <Loading />}
                {isSuccess && data && (
                    <Flex direction="column" justify="center" mt="5">
                        <Heading align="center">Results</Heading>
                        <SearchTable
                            canEditFormState={true}
                            artists={artists}
                            isLoading={isLoading}
                            data={{ type: DataType.EVENT, items: data }}
                            venueId={venueId}
                            showFeatured={false}
                        />
                    </Flex>
                )}
            </Flex>
        </FormLayout>
    )
}
