import { createContext } from "react"
import useModal from "../hooks/useModal"
import { ModalContextProps, ModalForms } from "../types"
import Modal from "../Modal"

const initialModalContext: ModalContextProps = {
    showModal: false,
    handleModal: () => {},
    modalContent: ModalForms.Band,
}

const ModalContext = createContext(initialModalContext)

const { Provider } = ModalContext

const ModalProvider = ({ children }: { children: JSX.Element }) => {
    const { showModal, handleModal, modalContent } = useModal()
    return (
        <Provider value={{ showModal, handleModal, modalContent }}>
            <Modal />
            <div>{children}</div>
        </Provider>
    )
}

export { ModalContext, ModalProvider }
