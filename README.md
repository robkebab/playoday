# Play O'Day

A friends-first, community-driven app for discovering new music together. Each day, users submit one song based on a fun or thoughtful prompt. The next morning, everyone wakes up to a new playlist—made entirely from their collective submissions.

## Vision

Play O'Day turns music discovery into a shared, daily experience. By combining Spotify's ecosystem with a social, prompt-based format, it creates a ritual that's both personal and collective. The MVP focuses on simplicity: daily prompts, song submissions, and playlists that connect friends through music.

## Core Concept

Play O'Day's experience is built around a daily rhythm:

1. **Connect** — Users log in with their Spotify account.
2. **Discover** — Each day, they can listen to the previous day's playlist ("Playlist of the Day").
3. **Contribute** — They see a new prompt for tomorrow's playlist and submit one song that fits the theme.
4. **Repeat** — The next day, their submission—and everyone else's—is released as a new playlist.

## Tech Stack

- **Frontend:** Next.js 16 (React 19) with TypeScript
- **Backend:** Next.js Serverless Functions (Vercel)
- **Database:** Postgres with Prisma ORM
- **Authentication:** AuthJS (Auth.js) with Spotify OAuth provider
- **Scheduler:** Vercel Cron Jobs (daily playlist generation at 00:00 UTC)
- **Deployment:** Vercel
- **Playback:** Spotify Web Playback SDK

## MVP Features

- **Spotify Integration:** Users authenticate with Spotify and are identified by their Spotify profiles
- **Daily Prompt:** A simple, shared theme for song submissions
- **Song Submission:** Users search and select a single track for tomorrow's playlist
- **Playlist Generation:** Every day at midnight (UTC), all submissions are compiled into a new Spotify playlist created under the central Play O'Day Spotify account
- **Playlist of the Day:** Users can view and play the current day's playlist directly in the app via Spotify's embedded player
- **Admin Tools:** A simple admin interface for managing prompts and triggering test playlist creation

## Future Enhancements

- Voting & Top Hits: Users can vote on songs in the playlist; a secondary "Top 13" playlist is generated daily
- Archives: Past playlists and prompts are viewable in an archive section
- Likes & Sync: Users can like songs directly in Play O'Day, syncing likes to their Spotify library
- Groups: Support for private or public friend groups with their own playlists and prompts
- Guest Mode: Limited listen-only experience without Spotify authentication
- Social Features: Comments, reactions, and shared discovery moments

## Getting Started

### Prerequisites

- Node.js 20+ and npm/yarn/pnpm
- A Postgres database (Neon, Supabase, or RDS recommended)
- A Spotify app (for OAuth credentials)
- A central Spotify account for Play O'Day (for playlist creation)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://..."

# Spotify OAuth
SPOTIFY_CLIENT_ID="your_spotify_client_id"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"
AUTHJS_SECRET="your_authjs_secret" # Generate with: openssl rand -base64 32

# Central Spotify Account (for playlist creation)
PLAY_ODAY_SPOTIFY_REFRESH_TOKEN="your_central_account_refresh_token"

# App URL (for OAuth callbacks)
NEXTAUTH_URL="http://localhost:3000"
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playoday
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Initialize Prisma
npx prisma generate

# Run migrations
npx prisma migrate dev
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
playoday/
├── app/                    # Next.js app directory
│   ├── api/               # API routes and endpoints
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── prisma/                # Prisma schema and migrations
├── .cursor/               # Project documentation and rules
│   └── rules/            # Architecture, API contracts, implementation plans
└── public/                # Static assets
```

## API Overview

The API is RESTful and uses Bearer tokens via AuthJS sessions (Spotify OAuth). Most endpoints require authentication unless marked as public.

### Key Endpoints

- `GET /api/auth/session` - Current authenticated session
- `GET /api/prompts/today` - Current prompt (public)
- `GET /api/prompts/tomorrow` - Tomorrow's prompt for submissions (public)
- `POST /api/submissions` - Submit a track (authenticated)
- `GET /api/submissions` - Get user's submissions (authenticated)
- `GET /api/playlists/today` - Today's playlist metadata (public)
- `POST /api/admin/playlists/generate` - Manually trigger playlist generation (admin)

For detailed API documentation, see [`.cursor/rules/api-contract.mdc`](.cursor/rules/api-contract.mdc).

## Data Model

### Core Entities

- **Users:** Spotify user profiles with refresh tokens
- **Prompts:** Daily themes for song submissions
- **Submissions:** User track submissions for a specific date
- **Playlists:** Generated Spotify playlists with metadata
- **PlaylistSubmissions:** Join table linking playlists to submissions

See [`.cursor/rules/technical-overview.mdc`](.cursor/rules/technical-overview.mdc) for detailed schema information.

## Development Workflow

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy
```

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## Deployment

The app is deployed on Vercel. The deployment process:

1. Push to `main` branch triggers automatic deployment
2. Vercel Cron Jobs run the daily playlist generation at 00:00 UTC
3. Environment variables are configured in Vercel dashboard

### Cron Jobs

The daily playlist generation job runs at `00:00 UTC` via Vercel Cron. The endpoint is:
- `GET /api/jobs/create-playlist?date=YYYY-MM-DD`

## Architecture Decisions

- **Serverless-first:** All API routes are Vercel Serverless Functions for scalability
- **Type-safe:** Prisma provides type-safe database queries
- **Central Spotify Account:** Uses a single account to create playlists, avoiding permission complexity
- **MVP Focus:** Simple, delightful flow over complex features

## Security & Privacy

- Refresh tokens are encrypted at rest
- Minimal PII stored—relies on Spotify for identity
- Role-based access control for admin pages
- Server-side validation for all inputs
- Rate limiting on API endpoints

## Scaling Considerations

For small scale (dozens of users):
- Serverless + Postgres single instance is sufficient
- Edge caching for static pages

For growth (hundreds → thousands):
- Move playlist creation to a job queue (BullMQ, Redis)
- Postgres read replicas
- CDN/edge caching for frequently requested resources
- Separate worker services for long-running jobs

## Implementation Plan

The project follows a phased implementation approach. See [`.cursor/rules/implementation-plan.mdc`](.cursor/rules/implementation-plan.mdc) for detailed phase breakdown:

1. Phase 0: Project setup & prep
2. Phase 1: Authentication & user model
3. Phase 2: Data model & admin prompt seed
4. Phase 3: Track search UI & submission flow
5. Phase 4: Daily playlist generation (Cron job)
6. Phase 5: Playlist of the day display & playback
7. Phase 6: Admin UI and tooling
8. Phase 7: Testing, QA & security hardening
9. Phase 8: Launch & rollout
10. Phase 9: Post-launch & next-step features

## Documentation

For more detailed documentation, see the `.cursor/rules/` directory:

- [Project Overview](.cursor/rules/project-overview.mdc) - Non-technical overview
- [Technical Overview](.cursor/rules/technical-overview.mdc) - Architecture and technical details
- [API Contract](.cursor/rules/api-contract.mdc) - API endpoint specifications
- [Implementation Plan](.cursor/rules/implementation-plan.mdc) - Phased development roadmap

## Contributing

This is a private project. For questions or contributions, please contact the project maintainers.

## License

Private - All rights reserved
