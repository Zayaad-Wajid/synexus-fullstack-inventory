# Synexus Fullstack Inventory

A full-stack inventory management system built as an internship evaluation project. The project will grow over four weeks, starting with a clean foundation for client, server, documentation, and future CRUD integration.

## Tech Stack

- Frontend: React + Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express.js
- Database: PostgreSQL
- ORM: Prisma
- API client: Axios

## Week 1 Goal

Build the foundation for the full-stack inventory management system with a professional repository structure and prepare the project for end-to-end CRUD integration in later steps.

## Project Structure

```text
synexus-fullstack-inventory/
  client/
  server/
  docs/
  README.md
  .gitignore
```

## Setup Instructions

### Client

```bash
cd client
npm install
npm run dev
```

The client will run with Vite during development.

### Server

```bash
cd server
npm install
npm run dev
```

The Express API will run on `http://localhost:5000` by default.

Health check endpoints:

```http
GET http://localhost:5000/api/health
GET http://localhost:5000/api/health/db
```

## Database Setup

Install PostgreSQL locally or use a hosted PostgreSQL database. Then create a local server environment file and set `DATABASE_URL`.

```bash
cp server/.env.example server/.env
```

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init_product_model
npm run db:seed
npm run dev
```

## Environment Variables

Create local `.env` files from the provided examples before running each application.

### Client

```bash
cp client/.env.example client/.env
```

### Server

```bash
cp server/.env.example server/.env
```
