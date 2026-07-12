# Week 1 Demo Notes

Use this walkthrough to record or present the Week 1 end-to-end CRUD flow.

## Demo Walkthrough

1. Start the PostgreSQL database from the project root.

```bash
docker compose up -d
```

2. Start the backend API.

```bash
cd server
npm run dev
```

3. Start the frontend client.

```bash
cd client
npm run dev
```

4. Open the inventory page.

```text
http://localhost:5173
```

5. Create a product from the form.

Example values:

```text
Name: Wireless Mouse
Category: Electronics
Quantity: 25
Unit Price (PKR): 2500
Supplier: Logitech
Status: IN_STOCK
Description: Ergonomic wireless mouse
```

6. Confirm the product appears in the product table.

7. Refresh the browser page.

8. Confirm the product still appears after refresh, showing that it was persisted in PostgreSQL.

9. Click Edit, update a field such as quantity or status, and submit the update.

10. Confirm the product row updates after the backend request completes.

11. Click Delete, confirm the browser prompt, and verify the product is removed from the list.

## Demo Focus

- Frontend form submission
- Backend API request through Axios
- PostgreSQL persistence through Prisma
- Refetching product list after create, update, and delete
- Error, success, loading, and editing states in the UI
