// Components
import RootLayout from '~/layouts/RootLayout'
import Calendar from '~/components/Calendar'
import RecurringGigs from '~/components/RecurringGigs'
import { Heading } from '@radix-ui/themes'
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
            <Heading size="9" mt="8">
                Listings
            </Heading>
            <Calendar />
            {data && (
                <>
                    <Heading size="9" mt="8">
                        Recurring Gigs
                    </Heading>
                    <RecurringGigs cmsData={data} />
                </>
            )}
        </RootLayout>
    )
}
