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
            <div className="z-100 border-white-2 m-10 box-border h-full w-3/5 border bg-black p-2">
                <div onClick={() => closeModal()}>X</div>
                <div className="h-screen">{modalContent}</div>
            </div>
        )
    } else return null
}
