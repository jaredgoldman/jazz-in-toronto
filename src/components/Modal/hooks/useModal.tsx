import { useState } from "react"
import { ModalContent } from "../types"

export default function useModal() {
    let [showModal, setShowModal] = useState<boolean>(false)
    let [modalContent, setModalContent] = useState<
        ModalContent
    >(null)

    let handleModal = (content: ModalContent = "") => {
        setShowModal(!showModal)
        if (content) {
            setModalContent(content)
        }
    }

    return { showModal, handleModal, modalContent }
}
