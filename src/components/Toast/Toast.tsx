import * as TComp from '@radix-ui/react-toast'
import { isToastVisibleAtom } from '~/atoms/isToastVisibleAtom'
import { useAtom } from 'jotai'
import { Cross1Icon } from '@radix-ui/react-icons'

type Props = {
    title: string
    description?: string
    action?: () => void
}

export function Toast({ title, description, action }: Props) {
    const [open, setOpen] = useAtom(isToastVisibleAtom)
    return (
        <TComp.Root open={open} onOpenChange={setOpen}>
            <TComp.Title>{title}</TComp.Title>
            {description && (
                <TComp.Description>{description}</TComp.Description>
            )}
            {action && (
                <TComp.Action
                    onClick={action}
                    altText={`${title}-close button`}
                />
            )}
            <TComp.Close>
                <Cross1Icon />
            </TComp.Close>
        </TComp.Root>
    )
}
