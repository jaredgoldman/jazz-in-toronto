import { AlertDialog, Button, Flex } from '@radix-ui/themes'

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    onDelete: () => void
}

export const ConfirmDelete = ({ onDelete, open, setOpen }: Props) => (
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
