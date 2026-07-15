# Demo Notes

Use this walkthrough to record or present the current full-stack evaluation flow.

## Start The App

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

## Week 2 Authentication Walkthrough

1. Open the login page.

```text
http://localhost:5173/login
```

2. Sign in with the seeded admin account.

```text
Email: admin@synexus.test
Password: Admin@12345
```

3. Confirm successful login redirects to the inventory page.

```text
http://localhost:5173/inventory
```

4. Confirm the header shows the signed-in user name, email, role, and Logout button.

5. Refresh the browser page.

6. Confirm the user remains signed in because AuthContext restored the session with `GET /api/auth/me`.

7. Confirm the inventory list still loads through protected API requests using the httpOnly cookie.

8. Click Logout.

9. Confirm the app navigates to `/login` and the user state clears.

10. Open the registration page.

```text
http://localhost:5173/register
```

11. Register a new staff account with a valid name, email, and password.

12. Confirm successful registration redirects to the inventory page and the header shows the new user.

13. In an API client, use the staff account to try `DELETE /api/products/:id` and confirm the backend returns `403` because delete requires ADMIN.

## Week 1 CRUD Walkthrough

1. Open the inventory page after login.

```text
http://localhost:5173/inventory
```

2. Create a product from the form.

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

3. Confirm the product appears in the product table.

4. Refresh the browser page.

5. Confirm the product still appears after refresh, showing that it was persisted in PostgreSQL.

6. Click Edit, update a field such as quantity or status, and submit the update.

7. Confirm the product row updates after the backend request completes.

8. Click Delete while signed in as ADMIN, confirm the browser prompt, and verify the product is removed from the list.

## Demo Focus

- Login and registration screens with validation and readable errors
- AuthContext restores sessions after refresh with `GET /api/auth/me`
- Logout clears the httpOnly cookie through the backend and clears frontend user state
- JWT stored in an httpOnly cookie, not browser storage
- Protected backend product routes using cookie credentials
- Frontend form submission through Axios
- PostgreSQL persistence through Prisma
- Refetching product list after create, update, and delete
- Error, success, loading, and editing states in the UI