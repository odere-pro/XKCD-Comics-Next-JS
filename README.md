# UI to explore XKCD strips

This is a simple UI to explore XKCD strips - https://xkcd.com. It is built using Next.js and TypeScript.
Demo: https://xkcd-comics-next-js.vercel.app/

Supported features:

1. Display thumbnails for all the strips with lazy loading on home page, route `/`
2. When use click on thumbnail, it will open thumbnail page with pagination navigation, route
   `/comics/[id]`
3. Route `/comics` will redirect to `/comics/[last_id]`
4. Breadcrumbs for easy navigation
5. 404 error handling
6. XKCD API in JSON format, `/api/comics`, `/api/comics/[id]`, `/api/comics/batch/[id]`
7. Caching images, and caching fetch requests to XKCD permanently for `/comics/[id]`, and revalidate
   every 1 day `/comics/[last_id]`
8. Dark mode (Next.js + Tailwind fom the box)
9. Show spinner while fetching XKCD data
10. Pagination on home page from last comics, show 12 per batch to address performance issues
11. Dockerized application
12. Can be deployed on Vercel
13. Units tests for code readability and to ensure the correctness of the features
14. ESLint, Prettier, Husky, Lint-staged for code quality
15. GitHub Actions to validate the code quality and run tests on every PR
16. CI/CD pipeline to deploy on Vercel on every PR merge

Requirements:

- Use the API described at <https://xkcd.com/json.html>
- The UI should be able to display thumbnails for all the strips (but not necessarily show all at
  the same time)
- You should be able to explore each strip more closely in some way
- Build your software in a way that you can build upon and maintain it for a long time to come.
- Add an extra feature/functionality that shows us who you are as an engineer.

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Whats next?

1. 5xx error handling
2. Add more tests
3. Prefer AWS instead of Vercel, deploy on ECS with the Docker image (should be cheaper than Vercel)
4. Add analytics (track user interactions)
5. Add DB for caching and proper pagination
6. Replace public assets with some branding
7. Optimize Tailwind CSS to increase readability and maintainability
8. Make Breadcrumbs more reusable
9. Add storybooks for components

## Getting Started

First, run the development server:
Install NVM <https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating>

```bash
nvm use
npm install
npm run dev
# or when run first time
docker compose up --build
# or
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the
file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.
