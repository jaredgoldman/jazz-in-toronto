import { DropdownMenu } from '@radix-ui/themes'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { ConfirmActionDialogue } from '~/components/ConfirmActionDialogue'

type Props = {
    isFeatured: boolean
    isApproved: boolean
    onToggleFeatured: () => void
    onEdit: () => void
    onDelete: () => void
    onApprove: () => void
}

export function TableActionMenu({
    isFeatured,
    isApproved,
    onToggleFeatured,
    onEdit,
    onDelete,
    onApprove
}: Props) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Flex>
                        <DotsVerticalIcon className="cursor-pointer" />
                    </Flex>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="2">
                    <DropdownMenu.Item onClick={onEdit}>Edit</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                        color={isFeatured ? 'green' : undefined}
                        onClick={onToggleFeatured}
                    >
                        {isFeatured ? 'Featured' : 'Feature'}
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                        color={isApproved ? 'green' : undefined}
                        onClick={onApprove}
                    >
                        {isApproved ? 'Approved' : 'Approve'}
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                        color="red"
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        Delete
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            <ConfirmActionDialogue
                onAction={onDelete}
                label="Delete Record"
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                description="You are about to delete a record. This action cannot be undone."
                level="error"
                actionButtonLabel="Delete"
            />
        </>
    )
}
