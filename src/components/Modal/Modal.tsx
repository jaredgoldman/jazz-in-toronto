import { useContext } from "react"
import { ModalContext } from "./context/ModalContext"

export default function Modal(): JSX.Element | null {
    const { showModal, modalContent, closeModal } = useContext(ModalContext)
    if (showModal) {
        return (
            <div className="absolute left-1/2 top-1/2 z-10 w-4/5 -translate-x-1/2 -translate-y-1/2 transform border-2 border-black bg-white p-2">
                <div onClick={() => closeModal()}>X</div>
                <div className="flex justify-center w-full">{modalContent}</div>
            </div>
        )
    } else return null
}
