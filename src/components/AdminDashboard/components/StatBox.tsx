// Components
import { Card, Heading, Text } from '@radix-ui/themes'
// Types
import { type DataType } from '~/types/enums'

interface Props {
    label: string
    data: number | string
    dataType: DataType
}

export default function StatBox({ label, data, dataType }: Props) {
    return (
        <Card>
            <Heading mb="4">{label} </Heading>
            <Text>{`${data} ${dataType.toLowerCase()}s`}</Text>
        </Card>
    )
}
