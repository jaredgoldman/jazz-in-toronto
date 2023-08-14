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
                className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                id="overlay"
                onClick={handleOutsideClick}
            >
                <div className="relative box-border max-h-[80vh] overflow-y-hidden rounded-md border-2 border-gray-400 px-3">
                    <div className="my-2 ml-3" onClick={() => closeModal()}>
                        X
                    </div>
                    <div>
                        <div className="flex w-full justify-center">
                            {modalContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else return null
}
