# Jazz In Toronto site

## Tasks

-   Do system design planning approach x
-   Plan frontend app x
    -   Pages x
    -   Components x
-   Build/test basic backend x
    -   Don't include crawling x
    -   Just create a db with CRUD endpoints x
-   Build/test frontend
    -   Public section x
        -   public book your gig form x
        -   add band x
        -   add venue x
        -   list venue x
    -   Admin section x
-   Add crawling and instagram modules x
-   Clean up imports x
-   Form validation x
-   Add seperate DB instance for testing
-   Add CMS x
-   Style site
-   Complete unit testing
-   Complete integration testing
-   End-to-end testing with playwright
-   Advanced form validation x

## Requirements

### functional

#### users

-   users should be able to visit the site and see daily listings of jazz shows going at least 1 month into the future
-   users should be able to see a detailed time and location of the gig
-   users should be able to see a recurring gigs
-   users should be to see all venues in town with an interactive map featuring pins of each venue - each venue should have a picture
-   users should be able to see featured bands, venues and events on the home page
-   users should be able to see a space for arbitrary sponsered content
-   users should vbe able to book gigs and enter new venues/bands if they aren't already present

#### admins

-   admins should be able to log into an admin panel where they can CRUD listings through a form
-   admins should be able to press a button to generate an instagram post.
-   the system should run a cron job to update listings by crawling several local websites and grabbing their listings
-   admins should be able to update content on the website using an easy UI
-   admins should be able to add recurring gigs to site
-   admins should be able to make bands, events and venues featured
-   admins should be able to pull reports from the backend ex: band/vanue with the most gigs

### non-functional

-   Listings should be updated immediately
-   System should have high-availability
-   Data is the value here so we need to have backups
-   Data transmitted is minimal, we don't need caching

## Design considerations

-   System will be overall more 5:1 read-write ratio

## Database type/schema

-   Because we'll want to use joins and gain insights from interrelated data, we'll use pgsql
-   Schema - see `prisma/schema.prisma`

## Capacity estimation and constraints

-   How many monthly visitors the site - 8000 monthly visitors
-   How many gigs:

    -   200/week x 4 x 12 - 9600 gigs per year
    -   rough estimate of 300 new bands per year

-   How many venues in town: 32

-   How much memory will each entry take up

    -   Band: 263 bytes
    -   Event - 253 bytes

-   Total memory needed for 5 years of gigs and bands
    -   Gigs: 9600 x 253 bytes = 2.3mb
    -   Bands: 300 x 263 bytes = 77.05kb
    -   lol nothing to worry about here

## High-level components

-   Client application
    -   Admin Panel
        -   CRUD Events, Gigs Venues
        -   Generate instagram posts
        -   Trigger manual crawl of venues sites
    -   Calendar
    -   Featured Event, Venue, Band
    -   Sponsered content
    -   Venue maps
    -   About us
    -   Book gig form
-   API
    -   CRUD Events, Gigs, Venues
    -   Crawl module with individual venue modules
    -   Generate instagram post (node-canvas)
    -   Produce stats
-   CMS
    -   CMS for content-driven pages
    -   About us, sponsered content, other content pages
