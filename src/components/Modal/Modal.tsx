// Libraries
import { useContext } from 'react'
// Context
import { ModalContext } from './context/ModalContext'
// Types
import { type ModalContextType } from './types'

export default function Modal(): JSX.Element | null {
    const { showModal, modalContent, closeModal } = useContext(
        ModalContext
    ) as ModalContextType
    if (showModal) {
        return (
            <div className="absolute left-1/2 top-1/2 z-10 w-4/5 -translate-x-1/2 -translate-y-1/2 transform border-2 border-black bg-white p-2 dark:border-white dark:bg-black">
                <div onClick={() => closeModal()}>X</div>
                <div className="flex w-full justify-center">{modalContent}</div>
            </div>
        )
    } else return null
}
