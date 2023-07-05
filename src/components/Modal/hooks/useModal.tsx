import { useState } from "react"

export default function useModal() {
    let [showModal, setShowModal] = useState<boolean>(false)
    let [modalContent, setModalContent] = useState<
        string | JSX.Element | null
    >(null)

    let handleModal = (content = "") => {
        setShowModal(!showModal)
        if (content) {
            setModalContent(content)
        }
    }

    return { showModal, handleModal, modalContent }
}
