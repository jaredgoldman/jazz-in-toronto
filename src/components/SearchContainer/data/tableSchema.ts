import { DataType } from '~/types/enums'

const tableSchema = {
    [DataType.EVENT]: [
        {
            label: 'Event Name',
            key: 'name'
        },
        {
            label: 'Venue',
            key: 'venue.name'
        },
        {
            label: 'Date',
            key: 'date'
        },
        {
            label: 'Artist',
            key: 'artist.name'
        },
        {
            label: 'Website',
            key: 'Website'
        },
        {
            label: 'Instagram',
            key: 'instagramHandle'
        },
        {
            label: 'Cancelled',
            key: 'cancelled'
        },
        {
            label: 'Featured',
            key: ''
        },
        {
            label: 'Edit',
            key: ''
        }
    ],
    [DataType.ARTIST]: [
        {
            label: 'Artist Name',
            key: 'name'
        },
        {
            label: 'Genre',
            key: 'genre'
        },
        {
            label: 'Instagram Handle',
            key: 'instagramHandle'
        },
        {
            label: 'Website',
            key: 'website'
        },
        {
            label: 'Active',
            key: 'active'
        },
        {
            label: 'Featured',
            key: 'featured'
        },
        {
            label: 'Instagram',
            key: 'instagramHandle'
        },
        {
            label: 'Featured',
            key: ''
        },
        {
            label: 'Edit',
            key: ''
        }
    ],
    [DataType.VENUE]: [
        {
            label: 'Name',
            key: 'name'
        },
        {
            label: 'Address',
            key: 'address'
        },
        {
            label: 'City',
            key: 'city'
        },
        {
            label: 'Website',
            key: 'website'
        },
        {
            label: 'Active',
            key: 'active'
        },
        {
            label: 'Instagram',
            key: 'instagramHandle'
        },
        {
            label: 'Featured',
            key: 'featured'
        },
        {
            label: 'Edit',
            key: 'edit'
        }
    ]
}

export default tableSchema
