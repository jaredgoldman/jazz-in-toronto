import { ReactNode, useEffect, useState } from 'react'

interface Props {
  children?: ReactNode
}

export default function FadeOutText({ children, ...props }: Props) {
    const [isVisible, setIsVisible] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000)
        return () => clearTimeout(timer) // Clean up on component unmount
    }, [])
    return (
        <div {...props} className={`fade-out-text ${isVisible ? 'visible' : 'hidden'}`}>
            {children}
        </div>
    )
}
