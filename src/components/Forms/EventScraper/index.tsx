// Components
import { Select } from '../Fields'
import SearchTable from '~/components/SearchContainer/components/SearchTable'
import FormLayout from '~/layouts/FormLayout'
import { Heading, Button, Flex, Text, Box } from '@radix-ui/themes'
// Types
import { type Venue } from '~/types/data'
// Utils
import { DataType } from '~/types/enums'
import DatePickerField from '../Fields/DatePicker'
import Loading from '~/components/Loading'
import * as Form from '@radix-ui/react-form'

import useEventScraper from './hooks/useEventScraper'

interface Props {
    venues: Venue[]
}

export default function EventScraper({ venues }: Props): JSX.Element {
    const { submit, isLoading, control, error, errors, data, isSuccess } =
        useEventScraper()

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
                    <Select
                        name="venueId"
                        label="Select a venue to scrape"
                        control={control}
                        optionData={venues}
                        error={errors.venueId}
                        required="You must select a venue to scrape"
                    />
                    <Flex width="100%" justify="center" mt="5">
                        <Form.Submit asChild>
                            <Button>Scrape Events</Button>
                        </Form.Submit>
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
                        <SearchTable items={data} dataType={DataType.EVENT} />
                    </Flex>
                )}
            </Flex>
        </FormLayout>
    )
}
