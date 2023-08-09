import { type EventWithBandVenue, type Band, type Venue } from '~/types/data'

export interface ModalContextType {
    showModal: boolean
    handleModal: (content?: string | JSX.Element) => void
    handleModalForm: (
        formType: ModalForms,
        itemData?: EventWithBandVenue | Band | Venue,
        onAdd?: (value: Band | Venue) => Promise<void>
    ) => void
    modalContent: string | JSX.Element
    closeModal: () => void
}

export enum ModalForms {
    Band = 'Band',
    Venue = 'Venue',
    Event = 'Event'
}
