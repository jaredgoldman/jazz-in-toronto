// Libraries
import { useState } from 'react'
// Compoments
import ModalDay from './ModalDay'
import { Table } from '@radix-ui/themes'
import Dialogue from '~/components/Dialogue'
// Types
import { type DailyEventData } from '../types'
// Context

interface Props {
    dailyEvents: DailyEventData
}

export default function CalendarDay({ dailyEvents }: Props) {
    const [dayText, setDayText] = useState<string | number>(
        dailyEvents.date.getDate()
    )

    const onHover = () => {
        if (!dailyEvents.numOfEvents) return
        setDayText(`${dailyEvents.numOfEvents} events`)
    }

    const onLeave = () => {
        if (!dailyEvents.numOfEvents) return
        setDayText(dailyEvents.date.getDate())
    }

    // Can we lazy load this?
    const modalDay = <ModalDay dailyEvents={dailyEvents} />

    return (
        <Table.Cell
            onMouseOver={onHover}
            onMouseOut={onLeave}
            onClick={() => {
                if (!dailyEvents.numOfEvents) return
                onLeave()
            }}
            justify="center"
        >
            <Dialogue
                title="Events"
                triggerLabel={dayText}
                component={modalDay}
                showSave={false}
                triggerButtonClassName="w-full"
                triggerButtonVariant="ghost"
            />
        </Table.Cell>
    )
}
