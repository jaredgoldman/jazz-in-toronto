// Libraries
import { useState } from 'react'
// Components
import BandForm from '~/components/Forms/Band'
import VenueForm from '~/components/Forms/Venue'
import EventForm from '~/components/Forms/Event'
// Types
import { type ModalContextType, ModalForms } from '../types'
import { type Band, type EventWithBandVenue, type Venue } from '~/types/data'
// Utils
import { isBand, isEvent, isVenue } from '~/utils/typeguards'

export default function useModal(): ModalContextType {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<JSX.Element | string>('')

    const handleModal = (content: JSX.Element | string = '') => {
        setShowModal(true)
        if (content) {
            setModalContent(content)
        }
    }

    const closeModal = () => setShowModal(false)

    const handleModalForm = (
        formType: ModalForms,
        itemData?: EventWithBandVenue | Band | Venue,
        onAdd?: (value: Band | Venue) => Promise<void>
    ) => {
        let form
        switch (formType) {
            case ModalForms.Band:
                form = (
                    <BandForm
                        currentValues={isBand(itemData) ? itemData : undefined}
                        closeModal={closeModal}
                        onAdd={onAdd}
                    />
                )
                break
            case ModalForms.Venue:
                form = (
                    <VenueForm
                        currentValues={isVenue(itemData) ? itemData : undefined}
                        closeModal={closeModal}
                        onAdd={onAdd}
                    />
                )
                break
            case ModalForms.Event:
                form = (
                    <EventForm
                        currentValues={isEvent(itemData) ? itemData : undefined}
                    />
                )
                break
        }
        setShowModal(true)
        setModalContent(form)
    }

    return { showModal, handleModal, modalContent, handleModalForm, closeModal }
}
