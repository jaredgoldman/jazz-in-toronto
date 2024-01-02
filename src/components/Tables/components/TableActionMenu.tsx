import { DropdownMenu } from '@radix-ui/themes'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { ConfirmDelete } from './confirmDelete'

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
            <ConfirmDelete
                onDelete={onDelete}
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
            />
        </>
    )
}
