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

Authentication endpoints are planned for Week 2 Step 2. JWTs will be issued by the backend and stored in an `httpOnly` cookie named by `COOKIE_NAME`.

| Method | Endpoint | Description | Status |
| --- | --- | --- | --- |
| POST | `/auth/register` | Register a new user account. | Placeholder |
| POST | `/auth/login` | Authenticate a user and set the auth cookie. | Placeholder |
| GET | `/auth/me` | Return the current authenticated user for session persistence after refresh. | Placeholder |
| POST | `/auth/logout` | Clear the auth cookie. | Placeholder |

Sample seeded test account:

```text
Email: admin@synexus.test
Password: Admin@12345
Role: ADMIN
```

These endpoints are not implemented yet. Product routes remain unprotected until the authentication flow is completed in a later Week 2 step.
## Product Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/products` | Fetch all products. |
| GET | `/products/:id` | Fetch a single product by ID. |
| POST | `/products` | Create a product. |
| PATCH | `/products/:id` | Update a product. |
| DELETE | `/products/:id` | Delete a product. |

Product prices are stored as numeric Decimal values in PostgreSQL and displayed as PKR on the frontend.

### Product Status Values

- `IN_STOCK`
- `LOW_STOCK`
- `OUT_OF_STOCK`

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
