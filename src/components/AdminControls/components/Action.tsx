import { Heading, Text, Button, Card, Flex } from '@radix-ui/themes'

interface Props {
    label: string
    description: string
    buttonLabel: string
    action: () => void
}

export default function Action({
    label,
    description,
    action,
    buttonLabel
}: Props) {
    return (
        <Card>
            <Flex direction="column">
                <Heading mb="4">{label}</Heading>
                <Text mb="4">{description}</Text>
                <Button onClick={action}>{buttonLabel}</Button>
            </Flex>
        </Card>
    )
}
