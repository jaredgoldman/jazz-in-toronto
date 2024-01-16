import { useEffect, useState } from 'react'

export default function FadeOutText({ children }) {
    const [isVisible, setIsVisible] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000)
        return () => clearTimeout(timer) // Clean up on component unmount
    }, [])
    return (
        <div className={`fade-out-text ${isVisible ? 'visible' : 'hidden'}`}>
            {children}
        </div>
    )
}
