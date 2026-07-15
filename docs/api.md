# API Documentation

Base URL: `http://localhost:5000/api`

## Frontend API Configuration

The React client reads the API base URL from `VITE_API_BASE_URL`. The default local value is:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Health Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | Checks whether the API is running. |
| GET | `/health/db` | Checks whether the API can connect to PostgreSQL through Prisma. |


## Authentication API

JWTs are signed by the backend and stored in an `httpOnly` cookie. The JWT is never returned in the JSON response body. Browser clients must send credentials/cookies with auth requests.

Frontend Axios requests should use `withCredentials: true` when calling protected auth endpoints in later frontend auth steps.

### Register

`POST /api/auth/register`

Request body:

```json
{
  "name": "Demo Staff",
  "email": "staff@synexus.test",
  "password": "Staff@12345"
}
```

Success response:

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "clxuserid001",
      "name": "Demo Staff",
      "email": "staff@synexus.test",
      "role": "STAFF",
      "createdAt": "2026-07-15T10:00:00.000Z",
      "updatedAt": "2026-07-15T10:00:00.000Z"
    }
  }
}
```

Conflict response:

```json
{
  "success": false,
  "message": "Email is already registered"
}
```

Validation error response:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "password",
      "message": "Password must include at least one uppercase letter"
    }
  ]
}
```

### Login

`POST /api/auth/login`

Request body:

```json
{
  "email": "admin@synexus.test",
  "password": "Admin@12345"
}
```

Success response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "clxuserid001",
      "name": "Demo Admin",
      "email": "admin@synexus.test",
      "role": "ADMIN",
      "createdAt": "2026-07-15T10:00:00.000Z",
      "updatedAt": "2026-07-15T10:00:00.000Z"
    }
  }
}
```

Invalid credentials response:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Get Current User

`GET /api/auth/me`

Requires the auth cookie from register/login.

Success response:

```json
{
  "success": true,
  "message": "Authenticated user fetched successfully",
  "data": {
    "user": {
      "id": "clxuserid001",
      "name": "Demo Admin",
      "email": "admin@synexus.test",
      "role": "ADMIN",
      "createdAt": "2026-07-15T10:00:00.000Z",
      "updatedAt": "2026-07-15T10:00:00.000Z"
    }
  }
}
```

Missing cookie response:

```json
{
  "success": false,
  "message": "Authentication required"
}
```

Invalid or expired cookie response:

```json
{
  "success": false,
  "message": "Invalid or expired session"
}
```

### Logout

`POST /api/auth/logout`

Requires the auth cookie from register/login.

Success response:

```json
{
  "success": true,
  "message": "Logout successful"
}
```

Sample seeded test account:

```text
Email: admin@synexus.test
Password: Admin@12345
Role: ADMIN
```

Product routes are protected. Login is required before accessing `/api/products`, and `DELETE /api/products/:id` requires the `ADMIN` role.
## Product Endpoints

Product endpoints are protected by cookie-based JWT authentication. Login through `POST /api/auth/login` before calling `/api/products`. The JWT is sent automatically by the browser or API client through the `httpOnly` cookie.

Access rules:

- `GET /api/products`: authenticated users only
- `GET /api/products/:id`: authenticated users only
- `POST /api/products`: authenticated users only
- `PATCH /api/products/:id`: authenticated users only
- `DELETE /api/products/:id`: `ADMIN` users only

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/products` | Fetch all products. |
| GET | `/products/:id` | Fetch a single product by ID. |
| POST | `/products` | Create a product. |
| PATCH | `/products/:id` | Update a product. |
| DELETE | `/products/:id` | Delete a product. ADMIN role required. |

Product prices are stored as numeric Decimal values in PostgreSQL and displayed as PKR on the frontend.

### Product Status Values

- `IN_STOCK`
- `LOW_STOCK`
- `OUT_OF_STOCK`

## Product Authorization Errors

Unauthenticated product request:

```json
{
  "success": false,
  "message": "Authentication required"
}
```

Invalid or expired session:

```json
{
  "success": false,
  "message": "Invalid or expired session"
}
```

STAFF user attempting to delete a product:

```json
{
  "success": false,
  "message": "You do not have permission to perform this action"
}
```

ADMIN user deleting a product succeeds:

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## Create Product

`POST /products`

Request body:

```json
{
  "name": "Wireless Mouse",
  "category": "Electronics",
  "quantity": 25,
  "unitPrice": 2500,
  "supplier": "Logitech",
  "status": "IN_STOCK",
  "description": "Ergonomic wireless mouse"
}
```

Success response:

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "clxproductid001",
    "name": "Wireless Mouse",
    "category": "Electronics",
    "quantity": 25,
    "unitPrice": "2500",
    "supplier": "Logitech",
    "status": "IN_STOCK",
    "description": "Ergonomic wireless mouse",
    "createdAt": "2026-07-09T10:00:00.000Z",
    "updatedAt": "2026-07-09T10:00:00.000Z"
  }
}
```

Validation error response:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "unitPrice",
      "message": "Unit price must be greater than 0"
    }
  ]
}
```

## Get Products

`GET /products`

Success response:

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": "clxproductid001",
      "name": "Wireless Mouse",
      "category": "Electronics",
      "quantity": 25,
      "unitPrice": "2500",
      "supplier": "Logitech",
      "status": "IN_STOCK",
      "description": "Ergonomic wireless mouse",
      "createdAt": "2026-07-09T10:00:00.000Z",
      "updatedAt": "2026-07-09T10:00:00.000Z"
    }
  ]
}
```

## Get Product By ID

`GET /products/:id`

Success response:

```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "id": "clxproductid001",
    "name": "Wireless Mouse",
    "category": "Electronics",
    "quantity": 25,
    "unitPrice": "2500",
    "supplier": "Logitech",
    "status": "IN_STOCK",
    "description": "Ergonomic wireless mouse",
    "createdAt": "2026-07-09T10:00:00.000Z",
    "updatedAt": "2026-07-09T10:00:00.000Z"
  }
}
```

Not found response:

```json
{
  "success": false,
  "message": "Product not found"
}
```

## Update Product

`PATCH /products/:id`

Request body:

```json
{
  "quantity": 12,
  "status": "LOW_STOCK",
  "unitPrice": 2200
}
```

Success response:

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "clxproductid001",
    "name": "Wireless Mouse",
    "category": "Electronics",
    "quantity": 12,
    "unitPrice": "2200",
    "supplier": "Logitech",
    "status": "LOW_STOCK",
    "description": "Ergonomic wireless mouse",
    "createdAt": "2026-07-09T10:00:00.000Z",
    "updatedAt": "2026-07-09T10:05:00.000Z"
  }
}
```

## Delete Product

`DELETE /products/:id`

Success response:

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```
