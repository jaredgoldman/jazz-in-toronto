// Components
import RootLayout from '~/layouts/RootLayout'
import Calendar from '~/components/Calendar'
import RecurringGigs from '~/components/RecurringGigs'
// Utils
import { graphQlWithAuth } from '~/utils/gql'
import { graphql } from '~/gql'
// Types
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { type ListingPageQuery } from '~/gql/graphql'

const query = graphql(`
    query listingPage {
        listing {
            data {
                attributes {
                    Heading
                    recurringGig {
                        id
                        day
                        artist
                        time
                        description
                        venue
                        image {
                            data {
                                attributes {
                                    name
                                    caption
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`)

export const getStaticProps: GetStaticProps<{
    data: ListingPageQuery | null
}> = async () => {
    const data = await graphQlWithAuth<ListingPageQuery>(query)
    return { props: { data } }
}

export default function Listings({
    data
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Event Listings">
            <Calendar />
            {data && <RecurringGigs cmsData={data} />}
        </RootLayout>
    )
}
