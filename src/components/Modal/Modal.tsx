import { useContext } from "react"
import { ModalContext } from "./context/ModalContext"
import BandForm from "../Forms/Band"
import VenueForm from "../Forms/Venue"
import { ModalForms } from "./types"

const modalForms = {
    [ModalForms.Band]: <BandForm />,
    [ModalForms.Venue]: <VenueForm />,
}

export default function Modal(): JSX.Element | null {
    const { showModal, handleModal, modalContent } = useContext(ModalContext)
    if (showModal) {
        return (
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform bg-black text-white">
                <div onClick={() => handleModal()}>X</div>
                {modalForms[modalContent]}
            </div>
        )
    } else return null
}
