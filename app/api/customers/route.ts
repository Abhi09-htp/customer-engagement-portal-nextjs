export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Pool } from "pg";

function getPool() {
  return new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Abhi2595",
    database: "customer_portal",
  });
}

/* READ */
export async function GET() {
  try {
    const pool = getPool();
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM customers ORDER BY created_at DESC"
    );
    await pool.end();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}

/* CREATE */
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    const pool = getPool();

    const result = await pool.query(
      "INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    await pool.end();
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}

/* UPDATE */
export async function PUT(req: Request) {
  try {
    const { id, name, email } = await req.json();
    const pool = getPool();

    const result = await pool.query(
      "UPDATE customers SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    await pool.end();
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

/* DELETE */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const pool = getPool();

    await pool.query("DELETE FROM customers WHERE id = $1", [id]);
    await pool.end();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
