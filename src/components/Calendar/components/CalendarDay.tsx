// Libraries
import { useContext, useState } from 'react'
// Compoments
import ModalDay from './ModalDay'
// Types
import { type DailyEventData } from '../types'
import { type ModalContextType } from '~/components/Modal/types'
// Context
import { ModalContext } from '~/components/Modal/context/ModalContext'

interface Props {
    dailyEvents: DailyEventData
}

export default function CalendarDay({ dailyEvents }: Props) {
    const [dayText, setDayText] = useState<string | number>(
        dailyEvents.date.getDate()
    )
    const { handleModal } = useContext(ModalContext) as ModalContextType

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
        <td
            onMouseOver={onHover}
            onMouseOut={onLeave}
            onClick={() => {
                if (!dailyEvents.numOfEvents) return
                onLeave()
                handleModal(modalDay)
            }}
            className="w-1/7 w-[5rem] py-5 text-center"
        >
            {dailyEvents.placeholder ? null : dayText}
        </td>
    )
}
