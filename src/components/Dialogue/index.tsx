// Libraries
import { ReactNode, useState } from 'react'
// Components
import { Dialog, Button, Box } from '@radix-ui/themes'
// Types

interface Props {
    triggerLabel: string | number
    component: JSX.Element
    closeLabel?: string
    description?: string
    title?: string
    onSubmit?: () => Promise<void>
    showSave?: boolean
    triggerButtonClassName?: string
    triggerButtonVariant?:
        | 'classic'
        | 'solid'
        | 'soft'
        | 'surface'
        | 'outline'
        | 'ghost'
    rawButton?: boolean
}

export default function Dialogue({
    triggerLabel,
    title,
    description,
    onSubmit,
    component,
    showSave = true,
    triggerButtonClassName,
    triggerButtonVariant = 'classic',
    rawButton = false
}: Props) {
    const [open, setOpen] = useState(false)

    const handleOnSave = async () => {
        onSubmit && (await onSubmit())
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                {rawButton ? (
                    <button className={triggerButtonClassName}>
                        {triggerLabel}
                    </button>
                ) : (
                    <Button
                        variant={triggerButtonVariant}
                        className={triggerButtonClassName}
                    >
                        {triggerLabel}
                    </Button>
                )}
            </Dialog.Trigger>
            <Dialog.Content className="max-w-4xl">
                {title && <Dialog.Title>{title}</Dialog.Title>}
                <Dialog.Description size="2" mb="4">
                    {description}
                </Dialog.Description>
                <Box mb="3">{component}</Box>
                <Dialog.Close>
                    <Button type="button" variant="soft" color="gray">
                        Cancel
                    </Button>
                </Dialog.Close>
                {showSave && (
                    <Button type="button" ml="2" onClick={handleOnSave}>
                        Save
                    </Button>
                )}
            </Dialog.Content>
        </Dialog.Root>
    )
}
