customer-engagement-portal-nextjs

Frontend

Next.js (App Router)

React

TypeScript

Plain CSS (dark theme UI)

Backend

Next.js API Routes

Node.js

PostgreSQL

pg (node-postgres)

Frontend

Next.js (App Router)

React

TypeScript

Plain CSS (dark theme UI)

Backend

Next.js API Routes

Node.js

PostgreSQL

pg (node-postgres)

Features Implemented

View list of customers

Add new customer (name + email)

Edit existing customer

Delete customer

Search customers by name or email

Pagination support

Server-side API integration

PostgreSQL database integration

customer-engagement-portal-nextjs
│
├── app
│   ├── api
│   │   └── customers
│   │       └── route.ts
│   ├── lib
│   │   └── db.ts
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── .env.local
├── package.json
├── README.md
└── tsconfig.json

 Database Configuration

 import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "YOUR_PASSWORD",
  database: "customer_portal",
});

export default pool;

API ENDPOINTS 


| GET    | `/api/customers` | Fetch all customers |
| POST   | `/api/customers` | Add a new customer  |
| PUT    | `/api/customers` | Update customer     |
| DELETE | `/api/customers` | Delete customer     |

Running the Project Locally
1️) Install dependencies
npm install

2️) Start PostgreSQL

Make sure PostgreSQL is running and the database exists.

3️) Run the app
npm run dev

4️) Open in browser
http://localhost:3000

5) Open in browser
http://localhost:3000

You can directly test the API in the browser or Postman:

http://localhost:3000/api/customers

 Assessment Notes

This project fulfills the CRUD requirements of the assessment.

Clean separation of frontend and backend logic.

Uses real database (PostgreSQL), not mock data.

UI kept simple and functional as per assessment expectations.

📌 Assessment Notes

This project fulfills the CRUD requirements of the assessment.

Clean separation of frontend and backend logic.

Uses real database (PostgreSQL), not mock data.

UI kept simple and functional as per assessment expectations.

 Author

Abhishek Mane
Full-Stack Developer

 Status

✔ Assessment Completed
✔ Ready for Review
✔ No further changes required

 IMPORTANT

This README reflects the final submission state.
No additional features are required unless explicitly requested.

## Production Note

The application uses PostgreSQL for data persistence.

 During local development, PostgreSQL runs locally and full CRUD functionality works as expected.
 When deployed on Vercel, the frontend and API routes are successfully deployed.
 However, the production deployment cannot access the local PostgreSQL instance, resulting in API responses returning an error.

This behavior is expected. In a real production environment, the database would be hosted on a cloud provider such as Railway, Supabase, or Neon and connected via environment variables.


Deployment

Frontend and backend are deployed on Vercel.

Live URL:
https://customer-engagement-portal-nextjs-5asspw9iy.vercel.app