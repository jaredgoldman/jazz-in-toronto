import { useMemo } from 'react'
import ModalDay from './ModalDay'
import { Flex, Table, Text, Heading, Popover, Button } from '@radix-ui/themes'
import { DailyEventData } from '../types'
import Dialogue from '~/components/Dialogue'
import { DateTime } from 'luxon'
import EventPopover from './EventPopover'
import { CircleIcon } from '@radix-ui/react-icons'

interface Props {
    dailyEvents: DailyEventData
}

export default function CalendarDay({ dailyEvents }: Props) {
    const modalDay = <ModalDay dailyEvents={dailyEvents} />

    const flatDailyEvents = useMemo(() => {
        if (!dailyEvents.numOfEvents) return []
        return Object.values(dailyEvents.events)
            .map((e) => e)
            .flat()
            .sort(
                (a, b) =>
                    DateTime.fromJSDate(a.startDate).toSeconds() -
                    DateTime.fromJSDate(b.startDate).toSeconds()
            )
    }, [dailyEvents])

    const triggerDialogueLabel = `+ ${flatDailyEvents.length - 5} more event${
        flatDailyEvents.length - 5 > 1 ? 's' : ''
    }`

    return (
        <Table.Cell justify="start">
            <Flex direction="column" gap="1" align="start">
                <Heading size="3">{dailyEvents.date.getDate()}</Heading>
                <Flex direction="column" gap="2" align="start">
                    {flatDailyEvents.slice(0, 5).map((event) => (
                        <EventPopover key={event.name} event={event}>
                            <Button size="1" variant="ghost" radius="small">
                                <CircleIcon width="10" />
                                <Text
                                    align="left"
                                    className="w-24 truncate text-[10px]"
                                >
                                    {event.name ?? event.artist.name}
                                </Text>
                            </Button>
                        </EventPopover>
                    ))}
                </Flex>
                {flatDailyEvents.length > 5 && (
                    <Dialogue
                        triggerLabel={triggerDialogueLabel}
                        component={modalDay}
                        showSave={false}
                        rawButton={true}
                        triggerButtonClassName="text-[10px] - hover:text-orange-400"
                    />
                )}
            </Flex>
        </Table.Cell>
    )
}
