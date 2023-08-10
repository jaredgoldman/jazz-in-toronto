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
            className="h-[5rem] min-w-[7rem]"
        >
            {dailyEvents.placeholder ? (
                <div></div>
            ) : (
                <div
                    className="flex h-full w-full items-center justify-center text-gray-300 hover:cursor-pointer hover:text-white"
                    onClick={() => {
                        if (!dailyEvents.numOfEvents) return
                        onLeave()
                        handleModal(modalDay)
                    }}
                >
                    <div>{dayText}</div>
                </div>
            )}
        </td>
    )
}
