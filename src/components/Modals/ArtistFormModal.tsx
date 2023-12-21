//local components
import ArtistForm from '../Forms/Artist'
//modules
import { Dialog, Box, Button } from '@radix-ui/themes'
import { useRouter } from 'next/router'
import { Artist } from '~/types/data'
import { useEffect, useState } from 'react'

type ArtistQuery = {
  id: string
  name: string
  genre: string
  photoPath: string
  instagramHandle: string
  website: string
  featured: string
  modal: string
}

export default function ArtistFormContainer() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const artist: Partial<Artist> = {
    id: router.query.id as string,
    name: router.query.name as string,
    genre: router.query.genre as string,
    photoPath: router.query.photoPath as string,
    instagramHandle: router.query.instagramHandle as string,
    website: router.query.website as string,
    featured: Boolean(router.query.featured).valueOf()
  }

  useEffect(() => {
    // Sync the modal state with the URL query parameter
    const modalState: boolean = Boolean(router.query.modal).valueOf()
    setIsOpen(modalState)
  }, [router.query.modal])

  const handleClose = async () => {
    const { modal, ...rest } = router.query
    const params = new URLSearchParams(rest as ArtistQuery).toString()
    await router.push(
      {
        pathname: router.pathname,
        search: params
      },
      undefined,
      { shallow: true }
    )
  }
  const handleOpen = async () => {
    await router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, modal: 'true' }
      },
      undefined,
      { shallow: true }
    )
  }
  // const handleOnSave = async () => {
  //   onSubmit && (await onSubmit())
  //   setOpen(false)
  // }
  // }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button onClick={handleOpen}>Edit</Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-4xl">
        <Dialog.Title>Edit Artist</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {/*TODO: Description*/}
        </Dialog.Description>
        <Box mb="3">
          <ArtistForm selectedArtist={artist} />
        </Box>
        <Dialog.Close>
          <Button type="button" variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Button onClick={handleClose} type="button" ml="2">
          Save
        </Button>
      </Dialog.Content>
    </Dialog.Root>
  )
}
