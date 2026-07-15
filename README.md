# Synexus Fullstack Inventory

A professional full-stack inventory management project built for an internship evaluation. Week 1 delivers the end-to-end Product CRUD flow, and Week 2 adds the foundation for secure authentication with JWTs stored in httpOnly cookies.

## Tech Stack

- Frontend: React + Vite
- Routing: React Router
- Styling: Tailwind CSS
- API client: Axios
- Backend: Node.js + Express.js
- Authentication: JWT + bcrypt + httpOnly cookies
- Database: PostgreSQL
- ORM: Prisma
- Local database: Docker Compose

## Feature Summary

- Clean repository structure with separate `client`, `server`, and `docs` folders
- Express API with health checks, CORS, centralized errors, validation, routes, controllers, and services
- PostgreSQL database managed through Prisma migrations and seed data
- Product CRUD API backed by PostgreSQL and Prisma
- React inventory page with form validation, loading/error/success states, edit mode, delete confirmation, and PKR currency display
- Frontend creates, updates, deletes, and fetches products through the backend API
- Week 2 login and registration screens call the backend auth API and rely on httpOnly cookies for session storage

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
JWT_SECRET="replace-with-a-secure-secret"
JWT_EXPIRES_IN="7d"
COOKIE_NAME="synexus_token"
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

Frontend routes:

| Route | Purpose |
| --- | --- |
| `/` | Redirects to `/inventory` |
| `/login` | Sign in with an existing account |
| `/register` | Create a staff account |
| `/inventory` | Product inventory workspace |

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

Open `http://localhost:5173/login`, sign in, and use the inventory page.

## Week 2 Authentication

Authentication uses JWTs stored in an httpOnly cookie named `synexus_token`. The frontend does not store the JWT in `localStorage` or `sessionStorage`; Axios sends the cookie automatically with API requests using `withCredentials: true`.

Implemented backend endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create a new staff account and set the auth cookie |
| POST | `/api/auth/login` | Authenticate a user and set the auth cookie |
| GET | `/api/auth/me` | Fetch the current user from the auth cookie for session persistence |
| POST | `/api/auth/logout` | Clear the auth cookie |

Frontend auth screens implemented in Week 2 Step 4:

- `http://localhost:5173/login`
- `http://localhost:5173/register`

Sample test account seeded for evaluators:

```text
Email: admin@synexus.test
Password: Admin@12345
Role: ADMIN
```

Session persistence after refresh through `GET /api/auth/me` and protected frontend route guards are planned for the next Week 2 step.

## Protected API Testing

Product routes are protected by the JWT httpOnly cookie.

1. Try `GET http://localhost:5000/api/products` before login and expect `401 Authentication required`.
2. Login with the seeded admin account.
3. Retry `GET http://localhost:5000/api/products` with the same browser or API client cookie jar and expect success.
4. Register or login as a STAFF user, then try `DELETE http://localhost:5000/api/products/:id` and expect `403 You do not have permission to perform this action`.
5. Login as the ADMIN user and retry the delete request. ADMIN users can delete products.

## Verify CRUD Persistence

1. Open the frontend at `http://localhost:5173/login`.
2. Sign in with the sample admin account.
3. Create a product with a name, category, quantity, unit price in PKR, supplier, status, and description.
4. Confirm the product appears in the table after submission.
5. Refresh the browser.
6. Confirm the product still appears, proving it was persisted in PostgreSQL.
7. Edit the product and confirm the updated values appear.
8. Delete the product and confirm it is removed from the refreshed list.

## API Documentation

Full API documentation is available in `docs/api.md`.

Product endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Fetch all products, authenticated users only |
| GET | `/api/products/:id` | Fetch one product, authenticated users only |
| POST | `/api/products` | Create a product, authenticated users only |
| PATCH | `/api/products/:id` | Update a product, authenticated users only |
| DELETE | `/api/products/:id` | Delete a product, ADMIN only |

## Demo Notes

Week 1 and Week 2 demo walkthrough notes are available in `docs/demo-notes.md`.

Screenshot placeholders are tracked in `docs/screenshots/README.md`.

## Evaluation Alignment

- Repository structure: clear `client`, `server`, `docs`, Docker, and env example separation
- API consumption: frontend API calls are isolated in `client/src/api`
- CORS configuration: backend uses `CLIENT_URL` and supports credentials for httpOnly cookie auth
- State management: inventory page tracks products, loading, submitting, error, success, and editing state
- Database integration: Prisma schema, migrations, seed data, PostgreSQL Docker service, and DB health endpoint are included
- Authentication: JWT cookie flow, login/register screens, sample account, and protected backend product routes are included

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

Also confirm the backend `CLIENT_URL` matches the frontend origin:

```env
CLIENT_URL=http://localhost:5173
```

### Protected requests return 401 after login

Make sure frontend requests use the shared Axios client in `client/src/api/apiClient.js`, which includes `withCredentials: true`.

### Prisma Client is out of date

Regenerate the Prisma Client:

```bash
cd server
npx prisma generate
```

## Evaluation Branches

No separate evaluation branch setup is required. The current branch contains the Week 1 CRUD flow and Week 2 authentication progress.