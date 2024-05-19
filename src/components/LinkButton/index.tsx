import { Button, Link } from '@radix-ui/themes'

/**
 * Props for the LinkButton component.
 * @typedef Props
 * @property {string} label - The text to display on the button.
 * @property {() => void} onClick - The function to call when the button is clicked.
 */
type Props = {
    label: string
    onClick: () => void
}

/**
 * A button that looks like a link.
 * @param {Props}
 */
export default function LinkButton({ label, onClick }: Props) {
    return <Link ></Link>
}
