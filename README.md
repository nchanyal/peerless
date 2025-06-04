## Background

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project was built as a prototype MVP for a client who was interested in a peer-to-peer delivery service. Core functionalities include user
account management, the ability to post, view, and delete delivery requests, as well as the capability for users to claim and fulfill posted requests.

## Project Structure

`src/app/dashboard/available/page.tsx` and `src/app/dashboard/claimed/page.tsx` serve the routes on `dashboard/available/` and `dashboard/claimed/`,
respectively. Each of them are made of React components that can be found in `src/components`.

Server actions can be found in `src/actions` and help perform CRUD operations in Next.js.

Unit and integration tests are run through Vitest by typing `npm run test` in the terminal. Each test lives in the same folder as it's component
for better association. It's worth noting that all tests fall the AAA pattern for frontend testing.

## Tech Stack

- Next.js
- React.js
- Tailwind CSS
- ShadCN UI
- Neon Postgres (backend)
- Prisma
- Clerk (user account management)
- React Testing Library
- Vitest

## Getting Started

First, clone the repository to your local machine:

```bash
git clone git@github.com:nchanyal/peerless.git
```

Second, install dependencies:

```bash
npm install
```

Third, add a `.env` file to the root of the project and fill the following:

```js
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
UPLOADTHING_TOKEN=
```

Note:

- `DATABASE_URL` comes from Neon Postgres
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` come from Clerk
- `UPLOADTHING_TOKEN` comes from uploadThing

Fourth, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
