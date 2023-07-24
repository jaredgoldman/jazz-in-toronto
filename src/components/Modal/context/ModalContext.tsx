// Libraries
import { createContext } from 'react'
// Components
import Modal from '../Modal'
// Types
import { type ModalContextProps } from '../types'
// Hooks
import useModal from '../hooks/useModal'

const initialModalContext: ModalContextProps = {
    showModal: false,
    handleModal: () => {},
    handleModalForm: () => {},
    closeModal: () => {},
    modalContent: ''
}

const ModalContext = createContext(initialModalContext)

const { Provider } = ModalContext

const ModalProvider = ({ children }: { children: JSX.Element }) => {
    const {
        showModal,
        handleModal,
        handleModalForm,
        modalContent,
        closeModal
    } = useModal()
    return (
        <Provider
            value={{
                showModal,
                handleModal,
                handleModalForm,
                modalContent,
                closeModal
            }}
        >
            <Modal />
            <div>{children}</div>
        </Provider>
    )
}

export { ModalContext, ModalProvider }
