import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { atom } from 'jotai'

type ToastProps = {
    visible: boolean
    title: string
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    swipeOut?: boolean
    fadeIn?: boolean
}

export const toastAtom = atom<ToastProps>({
    visible: false,
    title: '',
    message: '',
    type: 'success'
})

type Props = {
    title: string
    message: string
    type?: 'success' | 'error' | 'warning' | 'info'
}

export function useToast() {
    const [toastData, setToastData] = useAtom(toastAtom)

    useEffect(() => {
        const timer = setTimeout(() => {
            setToastData({
                ...toastData,
                visible: false
            })
        }, 5500)
        return () => {
            clearTimeout(timer)
        }
    }, [toastData, setToastData])

    const toast = ({ title, message, type = 'success' }: Props) => {
        setToastData({
            ...toastData,
            title,
            message,
            type,
            visible: true
        })
    }

    return toast
}
