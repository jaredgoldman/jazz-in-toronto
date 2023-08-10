import Image from 'next/image'
import React, { type ReactNode } from 'react'
import Link from 'next/link'
import classnames from 'classnames'

interface ButtonProps {
    children: ReactNode
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    isLoading?: boolean
    link?: string
    size?: 'sm' | 'md' | 'lg'
    bgColor?: string
    textColor?: string
    borderColor?: string
    hoverBgColor?: string
}

interface ButtonElementProps {
    children: ReactNode
    innerClassName?: string
}

export default function Button({
    children,
    onClick,
    type = 'button',
    disabled = false,
    isLoading = false,
    link,
    size = 'lg',
    bgColor = 'black',
    textColor = 'white',
    borderColor = 'white',
    hoverBgColor = 'hover:bg-gray-800'
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
            innerClassName={classnames(
                `flex items-center rounded-3xl justify-center border-2 p-1 border-${borderColor} bg-${bgColor} text-${textColor} ${hoverBgColor}`,
                {
                    'cursor-default': disabled,
                    'cursor-pointer': !disabled,
                    'w-11': size === 'sm',
                    'w-24': size === 'md',
                    'w-40': size === 'lg'
                }
            )}
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
