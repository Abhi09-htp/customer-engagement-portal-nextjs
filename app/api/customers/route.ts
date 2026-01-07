export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

/* READ: Get all customers */
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM customers ORDER BY created_at DESC"
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /customers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

/* CREATE: Add new customer */
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    const result = await pool.query(
      "INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /customers error:", error);
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}

/* UPDATE: Update customer */
export async function PUT(req: Request) {
  try {
    const { id, name, email } = await req.json();

    const result = await pool.query(
      "UPDATE customers SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("PUT /customers error:", error);
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 }
    );
  }
}

/* DELETE: Delete customer */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await pool.query("DELETE FROM customers WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /customers error:", error);
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    );
  }
}
