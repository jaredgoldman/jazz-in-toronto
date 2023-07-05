import { createContext } from "react"
import useModal from "../hooks/useModal"
import Modal from "../Modal"

interface ModalContextProps {
    showModal: boolean
    handleModal: (content?: string) => void
    modalContent: string | JSX.Element | null
}

const initialModalContext: ModalContextProps = {
    showModal: false,
    handleModal: () => {},
    modalContent: "modal content",
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
