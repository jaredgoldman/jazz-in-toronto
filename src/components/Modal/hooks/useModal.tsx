import { useState } from 'react'
import { ModalContextProps, ModalForms } from '../types'
import BandForm from '~/components/Forms/Band'
import VenueForm from '~/components/Forms/Venue'
import EventForm from '~/components/Forms/Event'
import { Band, EventWithBandVenue, Venue } from '~/types/data'

const modalForms = {
    [ModalForms.Band]: <BandForm />,
    [ModalForms.Venue]: <VenueForm />,
    [ModalForms.Event]: <EventForm />
}

export default function useModal(): ModalContextProps {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<JSX.Element | string>('')

    const handleModal = (content: JSX.Element | string = '') => {
        setShowModal(true)
        if (content) {
            setModalContent(content)
        }
    }

    const handleModalForm = (
        formType: ModalForms,
        itemData?: EventWithBandVenue | Band | Venue
    ) => {
        setShowModal(true)
        setModalContent(modalForms[formType])
    }

    const closeModal = () => setShowModal(false)

    return { showModal, handleModal, modalContent, handleModalForm, closeModal }
}
