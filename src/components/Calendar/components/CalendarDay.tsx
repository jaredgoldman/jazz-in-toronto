// Libraries
import { useContext } from 'react'
// Compoments
import ModalDay from './ModalDay'
import Button from '~/components/Button'
// Types
import { type DailyEventData } from '../types'
import { type ModalContextType } from '~/components/Modal/types'
// Utils
import { nthNumber } from '~/utils/date'
// Context
import { ModalContext } from '~/components/Modal/context/ModalContext'

interface Props {
    dailyEvents: DailyEventData
}

export default function CalendarDay({ dailyEvents }: Props) {
    const { handleModal } = useContext(ModalContext) as ModalContextType
    const dayOfMonth = dailyEvents.date.getDate()

    // Can we lazy load this?
    const modalDay = <ModalDay dailyEvents={dailyEvents} />

    return (
        <div className="border-2 border-black text-xs dark:border-white">
            {dailyEvents.placeholder ? (
                <div></div>
            ) : (
                <>
                    <div>{nthNumber(dayOfMonth)}</div>
                    <div>
                        {dailyEvents.numOfEvents > 0
                            ? `${dailyEvents.numOfEvents} events`
                            : 'no events'}
                    </div>
                    {dailyEvents.numOfEvents ? (
                        <Button onClick={() => handleModal(modalDay)}>
                            View
                        </Button>
                    ) : null}
                </>
            )}
        </div>
    )
}
