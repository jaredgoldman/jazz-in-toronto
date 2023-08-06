import Image from 'next/image'

interface ButtonProps {
    children: string
    className?: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    isLoading?: boolean
}

export default function Button({
    children,
    className = 'border-2 border-black dark:border-white dark:bg-gray p-1 min-w-[4.2rem] min-h-[2.25rem] flex justify-center items-center',
    onClick,
    type = 'button',
    disabled = false,
    isLoading = false
}: ButtonProps): JSX.Element {
    return (
        <button
            className={className}
            onClick={onClick}
            type={type}
            disabled={disabled}
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
        </button>
    )
}
