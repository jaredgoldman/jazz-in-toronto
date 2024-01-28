import { useEffect, useCallback } from 'react'
import { useAtom } from 'jotai'
import { atom } from 'jotai'

export enum ToastType {
    Success = 'success',
    Error = 'error'
}

type ToastProps = {
    title: string
    message: string
    type?: 'success' | 'error'
    visible?: boolean
    animating?: boolean
}

const defaultToastSettings = {
    title: '',
    message: '',
    type: 'success',
    visible: false,
    animating: false
} as ToastProps

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
        ({ title, message, type = 'success' }: ToastProps) => {
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

    useEffect(() => {
        resetToast()
    }, [resetToast])

    return { toast, resetToast }
}
