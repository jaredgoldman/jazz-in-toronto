import { useState, useEffect, useMemo, useRef } from 'react'
import Fuse from 'fuse.js'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Venue, Artist } from '~/types/data' // Assuming these types are defined somewhere in your project
import { TextField } from '@radix-ui/themes'

type Props = {
    items: Array<Venue | Artist>
}

export default function FuzzySearchDropdownInput({ items }: Props) {
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const fuse = new Fuse(items, {
        keys: ['name'],
        includeScore: true
    })

    const results = useMemo(
        () => (query ? fuse.search(query).map((result) => result.item) : []),
        [query, fuse]
    )

    useEffect(() => {
        // Open the dropdown if there are results and query isn't empty
        if (results.length && query) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [query, results.length])

    return (
        <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu.Trigger asChild>
                <TextField.Input
                    ref={inputRef}
                    type="text"
                    placeholder="Type to search..."
                    value={query}
                    onChange={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setQuery(e.target.value)
                    }}
                    onClick={() => setIsOpen(true)}
                />
            </DropdownMenu.Trigger>
            {isOpen && (
                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        onFocusOutside={(event) => event.preventDefault()} // Prevent focus from leaving the input
                        loop={true}
                        avoidCollisions={true}
                        onFocus={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            inputRef.current?.focus()
                        }} // Prevent focus from leaving the input
                    >
                        {results.map((item) => (
                            <DropdownMenu.Item
                                onPointerLeave={(event) =>
                                    event.preventDefault()
                                }
                                onPointerMove={(event) =>
                                    event.preventDefault()
                                }
                                key={item.id}
                                onSelect={() => {
                                    console.log(`You selected ${item.name}`)
                                    setIsOpen(false) // Close dropdown on select
                                }}
                            >
                                {item.name}
                            </DropdownMenu.Item>
                        ))}
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            )}
        </DropdownMenu.Root>
    )
}
