import { useEffect, useCallback } from 'react'
import { useAtom } from 'jotai'
import { atom } from 'jotai'

enum ToastType {
    Success = 'success',
    Error = 'error'
}

type ToastProps = {
    title: string
    message: string
    type: ToastType
    visible: boolean
    animating: boolean
}

const defaultToastSettings = {
    title: '',
    message: '',
    type: ToastType.Success,
    visible: false,
    animating: false
}

export const toastAtom = atom<ToastProps>(defaultToastSettings)

export function useToast() {
    const [toastData, setToastData] = useAtom(toastAtom)

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setToastData({
                ...toastData,
                animating: true,
                visible: false
            })
        }, 5000)
        const timer2 = setTimeout(() => {
            setToastData(defaultToastSettings)
        }, 5500)
        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [toastData, setToastData])

    const toast = useCallback(
        ({ title, message, type = ToastType.Success }: ToastProps) => {
            setToastData({
                ...toastData,
                title,
                message,
                type,
                visible: true,
                animating: true
            })
        },
        [toastData, setToastData]
    )

    const resetToast = useCallback(() => {
        setToastData(defaultToastSettings)
    }, [setToastData])

    return { toast, resetToast }
}
