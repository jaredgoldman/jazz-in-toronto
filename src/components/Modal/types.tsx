export interface ModalContextProps {
    showModal: boolean
    handleModal: (content?: string | JSX.Element) => void
    handleModalForm: (formType: ModalForms) => void
    modalContent: string | JSX.Element
    closeModal: () => void
}

export enum ModalForms {
    Band = 'Band',
    Venue = 'Venue',
    Event = 'Event'
}
