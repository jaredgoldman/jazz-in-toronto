// Libraries
import { useState } from 'react'
// Components
import { Dialog, Button, Box } from '@radix-ui/themes'
// Types

interface Props {
    title: string
    triggerLabel: string | number
    component: JSX.Element
    closeLabel?: string
    description?: string
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
}

export default function Dialogue({
    title,
    triggerLabel,
    description,
    onSubmit,
    component,
    showSave = true,
    triggerButtonClassName,
    triggerButtonVariant = 'classic'
}: Props) {
    const [open, setOpen] = useState(false)

    const handleOnSave = async () => {
        onSubmit && (await onSubmit())
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <Button
                    variant={triggerButtonVariant}
                    className={triggerButtonClassName}
                >
                    {triggerLabel}
                </Button>
            </Dialog.Trigger>
            <Dialog.Content className="max-w-4xl">
                <Dialog.Title>{title}</Dialog.Title>
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
