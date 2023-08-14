import { useState } from 'react'
import { RefObject } from 'react'
import { Dialog, Button } from '@radix-ui/themes'

interface Props {
    title: string
    triggerLabel: string
    component: JSX.Element
    closeLabel?: string
    description?: string
    formRef?: RefObject<{
        submitForm: () => Promise<void>
    }>
    refetch?: () => Promise<void>
}

export default function Dialogue({
    title,
    triggerLabel,
    description,
    component,
    formRef,
    refetch
}: Props) {
    const [open, setOpen] = useState(false)
    const handleOnSave = async () => {
        if (formRef?.current?.submitForm) {
            await formRef.current?.submitForm()
            refetch && (await refetch())
        }
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <Button>{triggerLabel}</Button>
            </Dialog.Trigger>
            <Dialog.Content className="max-w-4xl">
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    {description}
                </Dialog.Description>
                {component}
                <Dialog.Close>
                    <Button variant="soft" color="gray">
                        Cancel
                    </Button>
                </Dialog.Close>
                <Button
                    onClick={async () => {
                        await handleOnSave()
                    }}
                >
                    Save
                </Button>
            </Dialog.Content>
        </Dialog.Root>
    )
}
