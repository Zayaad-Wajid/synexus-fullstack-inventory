# API Documentation

Base URL: `http://localhost:5000/api`

## Health Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | Checks whether the API is running. |
| GET | `/health/db` | Checks whether the API can connect to PostgreSQL through Prisma. |

## Product Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/products` | Fetch all products. |
| GET | `/products/:id` | Fetch a single product by ID. |
| POST | `/products` | Create a product. |
| PATCH | `/products/:id` | Update a product. |
| DELETE | `/products/:id` | Delete a product. |

### Product Status Values

- `IN_STOCK`
- `LOW_STOCK`
- `OUT_OF_STOCK`

## Create Product

`POST /products`

Request body:

```json
{
  "name": "Logitech MX Master 3S Mouse",
  "sku": "ACC-MSE-001",
  "category": "Accessories",
  "quantity": 42,
  "unitPrice": 99.99,
  "supplier": "Logitech Distribution",
  "status": "IN_STOCK",
  "description": "Ergonomic wireless mouse for office and design workstations."
}
```

Success response:

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "clxproductid001",
    "name": "Logitech MX Master 3S Mouse",
    "sku": "ACC-MSE-001",
    "category": "Accessories",
    "quantity": 42,
    "unitPrice": "99.99",
    "supplier": "Logitech Distribution",
    "status": "IN_STOCK",
    "description": "Ergonomic wireless mouse for office and design workstations.",
    "createdAt": "2026-07-08T10:00:00.000Z",
    "updatedAt": "2026-07-08T10:00:00.000Z"
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
      "name": "Logitech MX Master 3S Mouse",
      "sku": "ACC-MSE-001",
      "category": "Accessories",
      "quantity": 42,
      "unitPrice": "99.99",
      "supplier": "Logitech Distribution",
      "status": "IN_STOCK",
      "description": "Ergonomic wireless mouse for office and design workstations.",
      "createdAt": "2026-07-08T10:00:00.000Z",
      "updatedAt": "2026-07-08T10:00:00.000Z"
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
    "name": "Logitech MX Master 3S Mouse",
    "sku": "ACC-MSE-001",
    "category": "Accessories",
    "quantity": 42,
    "unitPrice": "99.99",
    "supplier": "Logitech Distribution",
    "status": "IN_STOCK",
    "description": "Ergonomic wireless mouse for office and design workstations.",
    "createdAt": "2026-07-08T10:00:00.000Z",
    "updatedAt": "2026-07-08T10:00:00.000Z"
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
  "unitPrice": 89.99
}
```

Success response:

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "clxproductid001",
    "name": "Logitech MX Master 3S Mouse",
    "sku": "ACC-MSE-001",
    "category": "Accessories",
    "quantity": 12,
    "unitPrice": "89.99",
    "supplier": "Logitech Distribution",
    "status": "LOW_STOCK",
    "description": "Ergonomic wireless mouse for office and design workstations.",
    "createdAt": "2026-07-08T10:00:00.000Z",
    "updatedAt": "2026-07-08T10:05:00.000Z"
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
