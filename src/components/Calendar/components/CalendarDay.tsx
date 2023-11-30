// Libraries
import { useState } from 'react'
// Compoments
import ModalDay from './ModalDay'
import { Table } from '@radix-ui/themes'
import Dialogue from '~/components/Dialogue'
// Types
import { DailyEventData } from '../types'

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

    // TODO: Lazy load this component
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
                triggerLabel={dayText}
                component={modalDay}
                showSave={false}
                rawButton={true}
                triggerButtonClassName="w-full p-10 hover:bg-stone-600"
            />
        </Table.Cell>
    )
}
