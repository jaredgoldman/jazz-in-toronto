export interface ModalContextProps {
    showModal: boolean
    handleModal: (content?: ModalForms) => void
    modalContent: ModalForms
}

export enum ModalForms {
    Band = "Band",
    Venue = "Venue"
}

