import { useState, useEffect, useMemo, useRef } from 'react'
import Fuse from 'fuse.js'
import { Venue, Artist } from '~/types/data' // Assuming these types are defined somewhere in your project
import { TextField, DropdownMenu, Text, Button, Flex } from '@radix-ui/themes'
import {
    Controller,
    Control,
    FieldValues,
    Path,
    FieldError
} from 'react-hook-form'
import { MagnifyingGlassIcon, Cross1Icon } from '@radix-ui/react-icons'
import * as Form from '@radix-ui/react-form'
import Link from '~/components/Link'

type Props<T extends FieldValues> = {
    name: Path<T>
    items: Array<Venue | Artist>
    label?: string
    control: Control<T>
    required?: boolean | string
    error?: FieldError
}

export default function FuzzySearchDropdownInput<T extends FieldValues>({
    name,
    items,
    label,
    control,
    required = false,
    error
}: Props<T>) {
    const [query, setQuery] = useState('')
    const [hasSelected, setHasSelected] = useState(false)
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
        if (results.length && query && !hasSelected) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [query, results.length])

    return (
        <Controller
            control={control}
            rules={{ required }}
            name={name}
            render={({ field }) => (
                <Form.Field name={name}>
                    <Flex align="center" justify="between">
                        <Form.Label>{label}</Form.Label>
                        <Button variant="ghost" type="button" onClick={() => setQuery('')}>
                            Clear
                        </Button>
                    </Flex>
                    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenu.Trigger>
                            <TextField.Root {...field}>
                                <Form.Control asChild>
                                    <>
                                        <TextField.Input
                                            ref={inputRef}
                                            type="text"
                                            placeholder="Type to search..."
                                            value={query}
                                            onChange={(e) => {
                                                e.stopPropagation()
                                                e.preventDefault()
                                                setQuery(e.target.value)
                                                if (hasSelected) {
                                                    setHasSelected(false)
                                                }
                                            }}
                                        />
                                        <TextField.Slot>
                                            <MagnifyingGlassIcon />
                                        </TextField.Slot>
                                    </>
                                </Form.Control>
                            </TextField.Root>
                        </DropdownMenu.Trigger>
                        {isOpen && (
                            <DropdownMenu.Content
                                className="w-dropdown"
                                sticky="always"
                                size="2"
                                onFocusOutside={(event) =>
                                    event.preventDefault()
                                }
                                loop={true}
                                avoidCollisions={true}
                                onFocus={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    inputRef.current?.focus()
                                }}
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
                                            field.onChange(item.id)
                                            inputRef.current?.focus()
                                            setIsOpen(false)
                                            setHasSelected(true)
                                            setQuery(item.name)
                                        }}
                                    >
                                        {item.name}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>
                        )}
                    </DropdownMenu.Root>
                    {error && (
                        <Text size="2" color="red">
                            {error.message}
                        </Text>
                    )}
                </Form.Field>
            )}
        />
    )
}
