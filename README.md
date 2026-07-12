# Synexus Fullstack Inventory

A professional full-stack inventory management project built for an internship evaluation. Week 1 focuses on end-to-end setup and core CRUD integration: a user can create a product from the React frontend, the Express API stores it in PostgreSQL through Prisma, and the frontend fetches the updated list so records remain visible after refresh.

## Tech Stack

- Frontend: React + Vite
- Styling: Tailwind CSS
- API client: Axios
- Backend: Node.js + Express.js
- Database: PostgreSQL
- ORM: Prisma
- Local database: Docker Compose

## Week 1 Feature Summary

- Clean repository structure with separate `client`, `server`, and `docs` folders
- Express API with health checks, CORS, centralized errors, validation, routes, controllers, and services
- PostgreSQL database managed through Prisma migrations and seed data
- Product CRUD API without authentication, pagination, filtering, or file uploads
- React inventory page with form validation, loading/error/success states, edit mode, delete confirmation, and PKR currency display
- Frontend creates, updates, deletes, and fetches products through the backend API

Product prices are stored as numeric Prisma Decimal values and displayed as PKR on the frontend.

## Folder Structure

```text
synexus-fullstack-inventory/
  client/
    src/
      api/
      components/
      pages/
      utils/
    .env.example
  server/
    prisma/
    src/
      config/
      controllers/
      middleware/
      routes/
      services/
      validators/
    .env.example
  docs/
    api.md
    demo-notes.md
    screenshots/
  docker-compose.yml
  README.md
  .gitignore
```

## Prerequisites

- Node.js 18 or newer
- npm
- Docker Desktop or Docker Engine with Docker Compose
- A terminal that can run commands from the project root

## Environment Variables

Create local `.env` files from the examples. The real `.env` files are ignored by git.

### Frontend

```bash
cp client/.env.example client/.env
```

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend

```bash
cp server/.env.example server/.env
```

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:55432/synexus_inventory?schema=public"
```

## Docker PostgreSQL Setup

Start PostgreSQL from the project root:

```bash
docker compose up -d
```

The database uses host port `55432` to avoid conflicts with local PostgreSQL services on `5432`.

## Backend Setup

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Health checks:

```http
GET http://localhost:5000/api/health
GET http://localhost:5000/api/health/db
```

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Run The Full App

Use three terminals:

```bash
docker compose up -d
```

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

Open `http://localhost:5173` and use the inventory form.

## Verify CRUD Persistence

1. Open the frontend at `http://localhost:5173`.
2. Create a product with a name, category, quantity, unit price in PKR, supplier, status, and description.
3. Confirm the product appears in the table after submission.
4. Refresh the browser.
5. Confirm the product still appears, proving it was persisted in PostgreSQL.
6. Edit the product and confirm the updated values appear.
7. Delete the product and confirm it is removed from the refreshed list.

## API Documentation

Full API documentation is available in `docs/api.md`.

Product endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Fetch all products |
| GET | `/api/products/:id` | Fetch one product |
| POST | `/api/products` | Create a product |
| PATCH | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## Demo Notes

Week 1 demo walkthrough notes are available in `docs/demo-notes.md`.

Screenshot placeholders are tracked in `docs/screenshots/README.md`.

## Week 1 Evaluation Alignment

- Repository structure: clear `client`, `server`, `docs`, Docker, and env example separation
- API consumption: frontend API calls are isolated in `client/src/api/productApi.js`
- CORS configuration: backend uses `CLIENT_URL` from environment configuration
- State management: inventory page tracks products, loading, submitting, error, success, and editing state
- Database integration: Prisma schema, migrations, seed data, PostgreSQL Docker service, and DB health endpoint are included

## Common Troubleshooting

### Port 55432 is already in use

Update `docker-compose.yml` and `server/.env`, or stop the process already using the port.

### Container name already exists

If `synexus-postgres` already exists from a manual Docker run, remove it first:

```bash
docker rm -f synexus-postgres
```

Then start Docker Compose again:

```bash
docker compose up -d
```

### Backend cannot connect to the database

Confirm Docker is running and the database is healthy:

```bash
docker compose ps
```

Then verify `server/.env` contains the `55432` database URL.

### Frontend cannot reach the backend

Confirm the backend is running on port `5000` and `client/.env` contains:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Prisma Client is out of date

Regenerate the Prisma Client:

```bash
cd server
npx prisma generate
```

## Evaluation Branches

No separate evaluation branch setup is required for Week 1. The current branch contains the full Week 1 CRUD flow.
