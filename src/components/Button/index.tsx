interface ButtonProps {
    children: string
    className?: string
    onClick?: () => any
    type?: "button" | "submit" | "reset"
    disabled?: boolean
}
export default function Button({
    children,
    className = "flex flex-col m-2 border-2 border-black p-1",
    onClick,
    type = "button",
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
