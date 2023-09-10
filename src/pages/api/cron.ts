import { api } from '~/utils/api'

export default function handler() {
    const { mutate } = api.event.emailUnapproved.useMutation()
    console.log('sending email')
    mutate()
}
