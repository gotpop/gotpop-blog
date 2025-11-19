# Gotpop Blog

![Deploy Status](https://github.com/gotpop/blog/actions/workflows/deploy.yml/badge.svg)
[![Production](https://img.shields.io/badge/production-gotpop.io-blue)](https://gotpop.io)

Personal blog built with Next.js & Storyblok CMS, deployed to AWS EC2.

## Tech Stack

| Category   | Technology       |
| ---------- | ---------------- |
| Framework  | Next.js 15.5.4   |
| CMS        | Storyblok        |
| Language   | TypeScript       |
| Styling    | Scoped styles    |
| Deployment | Docker + AWS EC2 |
| CI/CD      | GitHub Actions   |

## Development

```bash
yarn dev        # Start dev server (http://localhost:3000)
yarn build      # Build for production
yarn lint       # Run linter
yarn type-check # Check TypeScript types
```

## Deployment

Automatic deployment via GitHub Actions:

1. Push to `main` branch (development)
2. Create PR from `main` → `master` (runs lint & type checks)
3. Merge PR (deploys to EC2 at https://gotpop.io)
