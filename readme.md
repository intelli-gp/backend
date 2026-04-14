# Mujedd Backend Api

This repository contains the backend for Intelli-GP, implemented with NestJS and Prisma. It is containerized with Docker Compose and configured to run in both development and production profiles.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
  - [Development (Docker)](#development-docker)
  - [Local development (no Docker)](#local-development-no-docker)
  - [Production (Docker)](#production-docker)
- [Environment & Configuration](#environment--configuration)
- [Database, Prisma & Migrations](#database-prisma--migrations)
- [Seeding](#seeding)
- [Testing & Linting](#testing--linting)
- [API Docs (Swagger)](#api-docs-swagger)

## Features

- NestJS backend structured with modules, controllers, and services
- Prisma as ORM with type-safe database access
- Docker Compose profiles for `dev` and `prod`
- Ready for CI/CD and container-based deployment
- Swagger/OpenAPI docs support (if configured)

## Tech Stack

- Node.js (TypeScript)
- NestJS
- Prisma ORM
- PostgreSQL
- Redis (optional)
- Docker + Docker Compose

## Requirements

- Node.js 
- npm / yarn / pnpm
- Docker & Docker Compose
- PostgreSQL (if running locally without Docker)

## Quick Start

### Development (Docker)
Recommended: use Docker Compose dev profile.

1. Start services:
   docker compose --profile dev up -d

2. Install dependencies in the repo (if you need to run commands inside the container):
   docker compose --profile dev exec app npm install

3. Run migrations and generate Prisma client (inside container or locally):
   docker compose --profile dev run --rm app npx prisma generate
   docker compose --profile dev run --rm app npx prisma migrate dev --name init

4. View logs:
   docker compose logs -f

5. Stop:
   docker compose down

### Local development (no Docker)

1. Copy example env:
   cp .env.example .env

2. Install dependencies:
   npm install

3. Generate Prisma client:
   npx prisma generate

4. Run migrations:
   npx prisma migrate dev --name init

5. Start dev server:
   npm run start:dev
   (common script: `nest start --watch`)

6. Build & run production locally:
   npm run build
   npm run start:prod
   (prod usually runs `node dist/main.js`)

Note: if your package.json uses yarn or pnpm adjust commands accordingly.

## Environment & Configuration

Create a `.env` in the repository root (do not commit secrets). Typical variables:

- PORT=3000
- DATABASE_URL=postgresql://user:password@db:5432/intelligp?schema=public
- NODE_ENV=development
- JWT_SECRET=your_jwt_secret
- REDIS_URL=redis://redis:6379
- CORS_ORIGINS=http://localhost:3000

If you have a `.env.example`, copy it:
cp .env.example .env

## Database, Prisma & Migrations

Prisma schema: prisma/schema.prisma

Common commands:

- Generate client:
  npx prisma generate

- Create a migration (local dev):
  npx prisma migrate dev --name <migration_name>

- Apply migrations (production):
  npx prisma migrate deploy

- Introspect existing DB:
  npx prisma db pull

- Open Prisma Studio:
  npx prisma studio

Run migrations inside Docker:
- For dev:
  `docker compose --profile dev up -d`
- For prod:
  `docker compose --profile prod run -d`

## Seeding

If you have a seed script configured (prisma db seed or a script in package.json):

- Local:
  npx prisma db seed

- Inside Docker:
  docker compose --profile dev run --rm app npx prisma db seed

Adjust the seed command to the implementation (JS/TS seed file or Prisma native seeding).

## Testing & Linting

Common scripts (adjust if different):

- Run tests:
  npm run test

- Run tests in watch mode:
  npm run test:watch

- Coverage:
  npm run test:cov

- Lint:
  npm run lint

- Format:
  npm run format

## API Docs (Swagger)

If Swagger is set up in the app (common Nest pattern):
- Swagger UI is usually available at `/api` or `/docs`
- Example: http://localhost:3000/docs

If not configured, add NestJS Swagger module to generate docs.
