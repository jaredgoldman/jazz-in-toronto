import { gql } from 'graphql-request'

export default gql`
    query {
        about {
            data {
                attributes {
                    heading
                    description
                    staffMembers {
                        data {
                            attributes {
                                name
                                position
                            }
                        }
                    }
                    team {
                        heading
                        image {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                    }
                    support {
                        heading
                        description
                        paypal
                        email
                        images {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
