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
            href: '/event',
            title: 'Add Your Gig'
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
