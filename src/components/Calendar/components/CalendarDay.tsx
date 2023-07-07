import { useContext } from "react"
import { ModalContext } from "~/components/Modal/context/ModalContext"
import ModalDay from "./ModalDay"
import { DailyEventData } from "../types"
import Button from "~/components/Button"
import { nthNumber } from "../utils"

interface Props {
    dailyEvents: DailyEventData
}

export default function CalendarDay({ dailyEvents }: Props) {
    const { handleModal } = useContext(ModalContext)
    const dayOfMonth = dailyEvents.date.getDate()

    const modalDay = <ModalDay dailyEvents={dailyEvents} />
    return (
        <div className="border-2 border-black m-2 p-1">
            <div>{nthNumber(dayOfMonth)}</div>
            <div>{`${dailyEvents.events.length} events`}</div>
            <Button onClick={() => handleModal(modalDay)}>View</Button>
        </div>
    )
}
