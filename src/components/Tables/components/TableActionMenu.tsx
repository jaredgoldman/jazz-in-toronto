import { DropdownMenu, AlertDialog, Button, Flex } from '@radix-ui/themes'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

type Props = {
    isFeatured: boolean
    onToggleFeatured: () => void
    onEdit: () => void
    onDelete: () => void
}

export function TableActionMenu({
    isFeatured,
    onToggleFeatured,
    onEdit,
    onDelete
}: Props) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <DotsVerticalIcon />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="2">
                    <DropdownMenu.Item onClick={onEdit}>Edit</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                        color={isFeatured ? undefined : 'green'}
                        onClick={() => {
                            onToggleFeatured()
                        }}
                    >
                        {isFeatured ? 'Unfeature' : 'Feature'}
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>Approve</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <AlertDialog.Root open={open} onOpenChange={setOpen}>
                        <AlertDialog.Trigger>
                            <DropdownMenu.Item
                                color="red"
                                onClick={() => {
                                    setOpen(true)
                                }}
                            >
                                Delete
                            </DropdownMenu.Item>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content style={{ maxWidth: 450 }}>
                            <AlertDialog.Title>
                                Confirm Delete
                            </AlertDialog.Title>
                            <AlertDialog.Description size="2">
                                You are about to delete a record. This action
                                cannot be undone.
                            </AlertDialog.Description>
                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button
                                        variant="solid"
                                        color="red"
                                        onClick={() => {
                                            onDelete()
                                            setOpen(false)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </>
    )
}
