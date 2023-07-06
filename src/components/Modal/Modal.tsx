import { useContext } from "react"
import { ModalContext } from "./context/ModalContext"
import BandForm from "../Forms/Band"
import VenueForm from "../Forms/Venue"
import { ModalForms } from "./types"

const modalForms = {
    [ModalForms.Band]: <BandForm />,
    [ModalForms.Venue]: <VenueForm />
}

export default function Modal(): JSX.Element | null {
    const { showModal, handleModal, modalContent } = useContext(ModalContext)
    if (showModal) {
        return (
            <div className="absolute left-1/2 top-1/2 z-10 w-4/5 -translate-x-1/2 -translate-y-1/2 transform border-2 border-black bg-white p-2">
                <div onClick={() => handleModal()}>X</div>
                <div className="flex justify-center w-full">{modalForms[modalContent]}</div>
            </div>
        )
    } else return null
}
