# Synexus Fullstack Inventory

A full-stack inventory management system built as an internship evaluation project. The project will grow over four weeks, starting with a clean foundation for client, server, documentation, and future CRUD integration.

## Tech Stack

- Frontend: React + Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express.js
- Database: PostgreSQL
- ORM: Prisma
- API client: Axios
- Local database: Docker Compose

## Week 1 Goal

Build the foundation for the full-stack inventory management system with a professional repository structure and prepare the project for end-to-end CRUD integration in later steps.

Step 5 builds the inventory UI with temporary React state. Step 6 will connect the UI to the backend Product API.

## Project Structure

```text
synexus-fullstack-inventory/
  client/
  server/
  docs/
  docker-compose.yml
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

Frontend local URL:

```text
http://localhost:5173
```

### Server

```bash
cd server
npm install
npm run dev
```

The Express API will run on `http://localhost:5000` by default.

## Database Setup with Docker

Start the local PostgreSQL database from the project root:

```bash
docker compose up -d
```

Create a local server environment file and confirm `DATABASE_URL` uses the Docker database port `55432`:

```bash
cp server/.env.example server/.env
```

Then prepare Prisma and start the backend:

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init_product_model
npm run db:seed
npm run dev
```

## Health Checks

Backend health:

```http
GET http://localhost:5000/api/health
```

Database health:

```http
GET http://localhost:5000/api/health/db
```

## Product API

Week 1 backend CRUD API is complete. Product endpoints are mounted under `/api/products`.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Fetch all products. |
| GET | `/api/products/:id` | Fetch one product by ID. |
| POST | `/api/products` | Create a product. |
| PATCH | `/api/products/:id` | Update a product. |
| DELETE | `/api/products/:id` | Delete a product. |

See `docs/api.md` for request and response examples. Product prices are stored as numeric Decimal values and displayed as PKR on the frontend.

## Frontend Inventory UI

Step 5 adds a responsive inventory dashboard at `http://localhost:5173` with:

- Product creation form with client-side validation
- Inventory stat cards
- Product table with status badges and PKR pricing
- Empty, loading, and error states ready for API integration

The form now creates and updates records through the backend Product API. Refreshing the page fetches persisted products from PostgreSQL.


## Week 1 Full-Stack Flow

Run the complete Week 1 inventory module locally:

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

Open the frontend:

```text
http://localhost:5173
```

Create a product from the inventory form, then refresh the page and confirm the product still appears. Persisted records are stored in PostgreSQL through the backend Product API.
## Troubleshooting

This project maps PostgreSQL to host port `55432` to avoid conflicts with other local PostgreSQL services that use `5432`.

If the container name already exists from a manual Docker run, remove it first:

```bash
docker rm -f synexus-postgres
```

Then start the database again:

```bash
docker compose up -d
```

## Environment Variables

Create local `.env` files from the provided examples before running each application.

### Client

```bash
cp client/.env.example client/.env
```

Client defaults:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Server

```bash
cp server/.env.example server/.env
```

Server defaults:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:55432/synexus_inventory?schema=public"
```
