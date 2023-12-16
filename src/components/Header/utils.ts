export enum HeaderType {
    Admin = 'Admin',
    Public = 'Public'
}

export const navLinks = {
    [HeaderType.Admin]: [
        {
            href: '/admin',
            title: 'Dashboard'
        },
        {
            href: '/admin/events',
            title: 'Events'
        },
        {
            href: '/admin/artists',
            title: 'Artists'
        },
        {
            href: '/admin/venues',
            title: 'Venues'
        }
    ],
    [HeaderType.Public]: [
        {
            title: 'Add',
            nested: [
                {
                    href: '/artist',
                    title: 'Artist'
                },
                {
                    href: '/venue',
                    title: 'Venue'
                },
                {
                    href: '/event',
                    title: 'Event'
                }
            ],
            href: '/'
        },
        {
            href: '/listings',
            title: 'Listings'
        },
        {
            href: '/about',
            title: 'About'
        },
        {
            href: '/venues',
            title: 'Venues'
        }
    ]
}
