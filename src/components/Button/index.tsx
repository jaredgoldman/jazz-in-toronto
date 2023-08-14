import Image from 'next/image'
import React, { type ReactNode } from 'react'
import Link from 'next/link'
import classnames from 'classnames'
import { Button } from '@radix-ui/themes'

interface ButtonProps {
    children: ReactNode
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    isLoading?: boolean
    link?: string
    size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    bgColor?: string
    textColor?: string
    borderColor?: string
    hoverBgColor?: string
    absolutePosition?: string
    roundedBorder?: boolean
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
    hoverBgColor = 'hover:bg-gray-800',
    absolutePosition = '',
    roundedBorder = true
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
            <Button onClick={onClick} type={type} disabled={disabled}>
                {children}
            </Button>
        )
    }

    return (
        <ButtonElement
            innerClassName={classnames(
                `flex items-center justify-center border-2 p-1 align-middle border-${borderColor} bg-${bgColor} text-${textColor} ${hoverBgColor} ${absolutePosition}`,
                {
                    'cursor-default': disabled,
                    'cursor-pointer': !disabled,
                    'w-6': size === '2xs',
                    'h-6': size === '2xs',
                    'h-16': size === 'xs',
                    'w-24': size === 'sm',
                    'w-36': size === 'md',
                    'w-40': size === 'lg',
                    'w-56': size === 'xl',
                    'rounded-3xl': roundedBorder
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
