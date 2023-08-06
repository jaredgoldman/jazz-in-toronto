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
            <div className="z-100 fixed inset-0 flex items-center justify-center bg-black/50">
                <div className="border-white-2 relative box-border max-h-[80vh] w-2/3 overflow-y-hidden border bg-black">
                    <div className="m-2" onClick={() => closeModal()}>
                        X
                    </div>
                    <div className="flex w-full justify-center">
                        <div className="w-1/2">{modalContent}</div>
                    </div>
                </div>
            </div>
        )
    } else return null
}
