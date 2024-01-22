# User

```tsx
import EventForm from '~/components/Forms/Event'
import { useEffect } from 'react'
import RootLayout from '~/layouts/RootLayout'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import useEventForm from '~/components/Forms/Event/hooks/useEventForm'

export default function EditEvent() {
    const router = useRouter()
    const param = router.query.id as string
    const { data } = api.event.get.useQuery({ id: param })
    const eventFormProps = useEventForm(data)

    useEffect(() => {
        if (data) {
            eventFormProps.reset(data)
        }
    }, [data, eventFormProps])

    return (
        <RootLayout pageTitle="Jazz in Toronto | Edit Artist">
            <EventForm {...eventFormProps} />
        </RootLayout>
    )
}
```

How can I stop the endless loop being caused by this useEffect?

# Assistant

The endless loop is happening because you're calling `eventFormProps.reset(data)`, which may be updating `data` object and in turn triggers the `useEffect` again since `data` is a dependency.
Here are a few solutions:

1. Add a condition inside `useEffect` to only trigger `reset` when `data` is actually changed:

```tsx
useEffect(() => {
    if (
        data &&
        JSON.stringify(data) !== JSON.stringify(eventFormProps.getValues())
    ) {
        eventFormProps.reset(data)
    }
}, [data, eventFormProps])
```

2. Only trigger `eventFormProps.reset` when `data` is first available:

```tsx
const [hasReset, setHasReset] = useState(false)
useEffect(() => {
    if (!hasReset && data) {
        eventFormProps.reset(data)
        setHasReset(true)
    }
}, [data, eventFormProps, hasReset])
```

3. If you are in full control of api and data content, you can check against a specific property:

```tsx
const prevId = useRef(null)
useEffect(() => {
    if (data && data.id !== prevId.current) {
        eventFormProps.reset(data)
        prevId.current = data.id
    }
}, [data, eventFormProps])
```

Please replace `id` with a suitable unique property from your `data`. These solutions should fix the looping problem.

# User
