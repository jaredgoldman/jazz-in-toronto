import Image from 'next/image'
import React, { type ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps {
    children: ReactNode
    className?: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    isLoading?: boolean
    link?: string
}

interface ButtonElementProps {
    children: ReactNode
    innerClassName?: string
}

export default function Button({
    children,
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    isLoading = false,
    link
}: ButtonProps): JSX.Element {
    const ButtonElement = ({
        children,
        innerClassName
    }: ButtonElementProps) => {
        if (link) {
            return (
                <Link href={link} legacyBehavior>
                    <a className={innerClassName}>{children}</a>
                </Link>
            )
        }
        return (
            <button
                className={innerClassName}
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
            innerClassName={`${className} dark:bg-gray flex min-w-[4.2rem] items-center justify-center border-2 border-black p-1 dark:border-white`}
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
