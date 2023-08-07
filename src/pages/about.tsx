import { useEffect } from 'react'
// Components
import RootLayout from '~/layouts/RootLayout'
import { api } from '~/utils/api'

export default function About(): JSX.Element {
    const { data } = api.cms.about.useQuery()

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <RootLayout>
            <main>Coming soon...</main>
        </RootLayout>
    )
}
