// Libraries
import { useContext } from 'react'
// Compoments
import ModalDay from './ModalDay'
import Button from '~/components/Button'
// Types
import { type DailyEventData } from '../types'
// Utils
import { nthNumber } from '~/utils/date'
// Context
import { ModalContext } from '~/components/Modal/context/ModalContext'

interface Props {
    dailyEvents: DailyEventData
}

export default function CalendarDay({ dailyEvents }: Props) {
    const { handleModal } = useContext(ModalContext)
    const dayOfMonth = dailyEvents.date.getDate()

    const modalDay = <ModalDay dailyEvents={dailyEvents} />
    return (
        <div className="m-2 border-2 border-black p-1">
            <div>{nthNumber(dayOfMonth)}</div>
            <div>{`${dailyEvents.events.length} events`}</div>
            <Button onClick={() => handleModal(modalDay)}>View</Button>
        </div>
    )
}
