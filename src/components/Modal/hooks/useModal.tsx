import { useState } from "react"
import { ModalContextProps, ModalForms } from "../types"
import BandForm from "~/components/Forms/Band"
import VenueForm from "~/components/Forms/Venue"

const modalForms = {
    [ModalForms.Band]: <BandForm />,
    [ModalForms.Venue]: <VenueForm />
}

export default function useModal(): ModalContextProps {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<JSX.Element | string>("")

    const handleModal = (content: JSX.Element | string  = "") => {
        setShowModal(true)
        if (content) {
            setModalContent(content)
        }
    }

    const handleModalForm = (formType: ModalForms) => {
        setShowModal(true)
        setModalContent(modalForms[formType])
    }

    const closeModal = () => setShowModal(false)

    return { showModal, handleModal, modalContent, handleModalForm, closeModal }
}
