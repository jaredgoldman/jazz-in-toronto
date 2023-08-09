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

export default function Button({
    children,
    className = 'border-2 border-black dark:border-white dark:bg-gray p-1 min-w-[4.2rem] min-h-[2.25rem] flex justify-center items-center',
    onClick,
    type = 'button',
    disabled = false,
    isLoading = false,
    link
}: ButtonProps): JSX.Element {
    const ButtonElement = ({ children }: { children: ReactNode }) => {
        if (link) {
            return (
                <Link href={link}>
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
        <ButtonElement>
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
