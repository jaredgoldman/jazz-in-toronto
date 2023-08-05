// Libraries
import { createContext } from 'react'
// Components
import Modal from '..'
// Types
import { type ModalContextType } from '../types'
// Hooks
import useModal from '../hooks/useModal'

const ModalContext = createContext<ModalContextType | null>(null)

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
