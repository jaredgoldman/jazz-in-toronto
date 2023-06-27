# Jazz In Toronto site

## Tasks

- Do system design planning approach
- Plan frontend app
  - Pages
  - Components
- Build/test basic backend
  - Don't include crawling
  - Just create a db with CRUD endpoints
- Build/test frontend
  - Public section
  - Admin section
- Add crawling and instagram modules

## Requirements

### functional

#### users

- users should be able to visit the site and see daily listings of jazz shows going at least 1 month into the future
- users should be able to see a detailed time and location of the gig
- users should be able to see a recurring gigs
- users should be to see all venues in town with an interactive map featuring pins of each venue

#### admins

- admins should be able to log into an admin panel where they can CRUD listings through a form
- admins should be able to press a button to generate an instagram post
- the system should run a cron job to update listings by crawling several local websites and grabbing their listings
- admins should be able to update content on the website using an easy UI
- admins should be able to add recurring gigs to site

### non-functional

- Listings should be updated immediately
- System should have high-availability
- Data is the value here so we need to have backups
- Data transmitted is minimal, we don't need caching

## Design considerations

- System will be overall more 5:1 read-write ratio

## Database type/schema

- Because we'll want to use joins and gain insights from interrelated data, we'll use pgsql
- Schema - see `prisma/schema.prisma`

## Capacity estimation and constraints

## High-level components
