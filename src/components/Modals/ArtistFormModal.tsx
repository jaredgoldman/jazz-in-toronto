//local components
import ArtistForm from '../Forms/Artist'
//modules
import { Dialog, Box, Button } from '@radix-ui/themes'
import { useRouter } from 'next/router'
import { Artist } from '~/types/data'
import { useState } from 'react'

type ArtistQuery = {
  id: string
  name: string
  genre: string
  photoPath: string
  instagramHandle: string
  website: string
  featured: string
}

export default function ArtistFormContainer() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const query = router.query as ArtistQuery

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }
  const getArtistFromParams = (query: ArtistQuery) => {
    const artist: Partial<Artist> = {
      id: query.id,
      name: query.name,
      genre: query.genre,
      photoPath: query.photoPath,
      instagramHandle: query.instagramHandle,
      website: query.website,
      featured: Boolean(query.featured).valueOf()
    }
    return artist as Artist
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
          <ArtistForm selectedArtist={getArtistFromParams(query)} />
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
