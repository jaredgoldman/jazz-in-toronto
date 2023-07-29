interface ButtonProps {
    children: string
    className?: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
}

export default function Button({
    children,
    className = 'border-2 border-black dark:border-white dark:bg-gray p-1',
    onClick,
    type = 'button',
    disabled = false
}: ButtonProps): JSX.Element {
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
