# Customer Engagement Portal

A full-stack web application designed to manage customer data for small sales teams.  
This project demonstrates a clean implementation of frontend UI, backend APIs, and database integration using modern web technologies.

---

## Problem Statement

Sales teams need a simple system to:
- Store customer details
- View and manage customer records
- Perform basic CRUD operations efficiently

This application solves that problem using a lightweight, full-stack architecture.

---

## Features Implemented

- View list of customers
- Add new customers (name and email)
- Edit existing customer details
- Delete customers
- Search customers by name or email
- Pagination support
- Server-side API integration
- PostgreSQL database integration (real database, not mock data)

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Plain CSS (dark theme UI)

### Backend
- Next.js API Routes
- Node.js
- PostgreSQL
- pg (node-postgres)

---

## Project Structure

customer-engagement-portal-nextjs
│
├── app
│ ├── api
│ │ └── customers
│ │ └── route.ts
│ ├── lib
│ │ └── db.ts
│ ├── page.tsx
│ ├── layout.tsx
│ └── globals.css
│
├── .env.local
├── package.json
├── README.md
└── tsconfig.json


---

## Database Configuration

PostgreSQL is used for data persistence.

Example configuration (`app/lib/db.ts`):

```ts
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "YOUR_PASSWORD",
  database: "customer_portal",
});

export default pool;


| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/customers` | Fetch all customers |
| POST   | `/api/customers` | Add a new customer  |
| PUT    | `/api/customers` | Update customer     |
| DELETE | `/api/customers` | Delete customer     |

Running the Project Locally
1. Install dependencies
npm install

2. Start PostgreSQL

Make sure PostgreSQL is running and the database exists.

3. Run the application
npm run dev

4. Open in browser
http://localhost:3000


You can also test the API directly:

http://localhost:3000/api/customers

Production Note

The application uses PostgreSQL for data persistence.

During local development, PostgreSQL runs locally and full CRUD functionality works as expected.

The application is deployed on Vercel.

Vercel cannot access a local PostgreSQL instance, so in production the API may return an error when attempting database operations.

This behavior is expected.
In a real production environment, the database would be hosted on a cloud provider such as Railway, Supabase, or Neon, and connected using environment variables.

Deployment

The application is deployed on Vercel.

Live URL:
https://customer-engagement-portal-nextjs-5asspw9iy.vercel.app

Assessment Notes

This project fulfills all CRUD requirements of the assessment.

Clean separation of frontend and backend logic.

Uses a real PostgreSQL database.

UI is intentionally simple and functional as per assessment expectations.

Author

Abhishek Mane
Full-Stack Developer
GitHub: https://github.com/Abhi09-htp
LinkedIn: https://www.linkedin.com/in/abhishek-mane-0033a1327

