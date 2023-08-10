// Libraries
import { useContext, useState } from 'react'
// Compoments
import ModalDay from './ModalDay'
import Button from '~/components/Button'
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
    const pointer = dailyEvents.numOfEvents
        ? 'cursor-pointer'
        : 'cursor-default'

    return (
        <td
            onMouseOver={onHover}
            onMouseOut={onLeave}
            className="h-[5rem] min-w-[7rem]"
        >
            {dailyEvents.placeholder ? (
                <div></div>
            ) : (
                <Button
                    className={`h-full w-full border-none text-white hover:bg-gray-200 hover:text-black ${pointer}`}
                    onClick={() => {
                        if (!dailyEvents.numOfEvents) return
                        onLeave()
                        handleModal(modalDay)
                    }}
                >
                    <div>{dayText}</div>
                </Button>
            )}
        </td>
    )
}
