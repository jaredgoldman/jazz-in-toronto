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
 * ConfirmActionDialogue component used for triggering an action.
 *
 * @param {boolean} open - Indicates whether the dialog is open.
 * @param {function} setOpen - Function to set the open state of the dialog.
 * @param {function} onAction - Function to call when the action button is clicked.
 * @param {'info' | 'warn' | 'error'} [level='info'] - The severity level of the action.
 * @param {string} label - The title of the dialog.
 * @param {string} description - The description of the action to confirm.
 * @param {string} actionButtonLabel - The label for the action button.
 * @param {string} [cancelButtonLabel='Cancel'] - The label for the cancel button.
 * @returns {JSX.Element} The rendered ConfirmActionDialogue component.
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
}: Props): JSX.Element => (
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
