import { useState } from 'react'
import { Dialog, Button } from '@radix-ui/themes'
import { type QueryObserverResult } from '@tanstack/react-query'
import { type RefObject } from 'react'

interface Props {
    title: string
    triggerLabel: string | number
    component: JSX.Element
    closeLabel?: string
    description?: string
    formRef?: RefObject<{
        submitForm: () => Promise<void>
    }>
    refetch?: () => Promise<QueryObserverResult<unknown>>
    showSave?: boolean
}

export default function Dialogue({
    title,
    triggerLabel,
    description,
    component,
    formRef,
    refetch,
    showSave = true
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
                {showSave && <Button onClick={void handleOnSave}>Save</Button>}
            </Dialog.Content>
        </Dialog.Root>
    )
}
