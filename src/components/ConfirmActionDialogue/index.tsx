import { AlertDialog, Button, Flex } from '@radix-ui/themes'

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    onAction: () => void
    level?: 'info' | 'warn' | 'error'
    label: string
    description: string
    actionButtonLabel: string
    cancelButtonLabel?: string
}

const buttomColorMap = {
    info: 'blue',
    warn: 'yellow',
    error: 'red'
} as const

/**
 * ConfirmActtionDialogue component used for triggering an action
 *
 */
export const ConfirmActionDialogue = ({
    onAction,
    open,
    setOpen,
    level = 'info',
      label,
    description,
    cancelButtonLabel = 'Cancel',
    actionButtonLabel
}: Props) => (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>{label}</AlertDialog.Title>
            <AlertDialog.Description size="2">
                {description}
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                        {cancelButtonLabel}
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button
                        variant="solid"
                        color={buttomColorMap[level]}
                        onClick={() => {
                            onAction()
                            setOpen(false)
                        }}
                    >
                        {actionButtonLabel}
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
)
