# User

```tsx
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
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

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
                    <AlertDialog.Root
                        open={deleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                    >
                        <AlertDialog.Trigger>
                            <DropdownMenu.Item
                                color="red"
                                onClick={() => {
                                    setDeleteDialogOpen(true)
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
                                            setDeleteDialogOpen(false)
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
```

I want to extract the AlertDialog into its own component, and then
use it in the `TableActionMenu` component.

# Assistant

Here is how you might extract the AlertDialog into a `DeleteAlertDialog` component:

```tsx
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useState } from 'react'
type DeleteAlertDialogProps = {
    onDelete: () => void
    open: boolean
    setOpen: (open: boolean) => void
}
export const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({
    onDelete,
    open,
    setOpen
}) => (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
            <AlertDialog.Description size="2">
                You are about to delete a record. This action cannot be undone.
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
)
// Now you can use this in your existing component like so:
export function TableActionMenu({
    isFeatured,
    onToggleFeatured,
    onEdit,
    onDelete
}: Props) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <DotsVerticalIcon />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="2">
                    //... other dropdown items
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                        color="red"
                        onClick={() => {
                            setDeleteDialogOpen(true)
                        }}
                    >
                        Delete
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            <DeleteAlertDialog
                onDelete={onDelete}
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
            />
        </>
    )
}
```

This `DeleteAlertDialog` component is quite flexible and reusable, as you can pass in different delete functions, initial open state, and a function to control the open state.

# User
