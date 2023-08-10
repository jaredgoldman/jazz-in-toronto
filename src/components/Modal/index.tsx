// Libraries
import { useContext, type MouseEvent } from 'react'
// Context
import { ModalContext } from './context/ModalContext'
// Types
import { type ModalContextType } from './types'

export default function Modal(): JSX.Element | null {
    const { showModal, modalContent, closeModal } = useContext(
        ModalContext
    ) as ModalContextType

    const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            closeModal()
        }
    }

    if (showModal) {
        return (
            <div
                className="z-100 fixed inset-0 flex items-center justify-center bg-black/50"
                id="overlay"
                onClick={handleOutsideClick}
            >
                <div className="relative box-border max-h-[80vh] w-2/3 overflow-y-hidden rounded-md bg-gray-800">
                    <div className="my-2 ml-3" onClick={() => closeModal()}>
                        X
                    </div>
                    <div>
                        <div className="w-full">{modalContent}</div>
                    </div>
                </div>
            </div>
        )
    } else return null
}
