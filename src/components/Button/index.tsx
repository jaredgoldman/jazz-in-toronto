import Image from 'next/image'
import { ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps {
    children: string
    className?: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    isLoading?: boolean
    link?: string
}

interface ButtonElementProps {
    children: ReactNode
    className: string
}

export default function Button({
    children,
    className,
    onClick,
    type = 'button',
    disabled = false,
    isLoading = false,
    link
}: ButtonProps): JSX.Element {
    const ButtonElement = ({ children, className }: ButtonElementProps) => {
        if (link) {
            return (
                <Link href={link} legacyBehavior>
                    <a className={className}>{children}</a>
                </Link>
            )
        }
        return (
            <button
                className={className}
                onClick={onClick}
                type={type}
                disabled={disabled}
            >
                {children}
            </button>
        )
    }

    return (
        <ButtonElement
            className={`${className} dark:bg-gray flex min-h-[2.25rem] min-w-[4.2rem] items-center justify-center border-2 border-black p-1 dark:border-white`}
        >
            {isLoading ? (
                <Image
                    className="animate-spin"
                    src="/images/spinner.png"
                    width={20}
                    height={20}
                    alt="loading"
                />
            ) : (
                children
            )}
        </ButtonElement>
    )
}
