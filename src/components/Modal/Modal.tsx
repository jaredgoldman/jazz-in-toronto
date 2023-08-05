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
            <div className="z-100 border-white-2 m-2 box-border border bg-black p-2">
                <div onClick={() => closeModal()}>X</div>
                <div className="flex w-full justify-center">{modalContent}</div>
            </div>
        )
    } else return null
}
