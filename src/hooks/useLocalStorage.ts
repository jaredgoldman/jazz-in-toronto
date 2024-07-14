import { useState } from 'react'

/**
 * Hook to use local storage
 * @param {string} key - key to store the value in local storage
 * @param {T} initialValue - initial value to store in local storage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) as T : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(error)
        }
    }

    return [storedValue, setValue] as const
}
