"use client";

import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export default function HomePage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      setLoading(true);
      const res = await fetch("/api/customers");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCustomers(data);
      setError("");
    } catch {
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }

  async function addCustomer(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email) return;

    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (!res.ok) {
      alert("Failed to add customer");
      return;
    }

    setName("");
    setEmail("");
    fetchCustomers();
  }

  async function updateCustomer(id: number) {
    if (!editName || !editEmail) return;

    const res = await fetch("/api/customers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name: editName,
        email: editEmail,
      }),
    });

    if (!res.ok) {
      alert("Failed to update customer");
      return;
    }

    setEditingId(null);
    setEditName("");
    setEditEmail("");
    fetchCustomers();
  }

  async function deleteCustomer(id: number) {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    const res = await fetch("/api/customers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      alert("Failed to delete customer");
      return;
    }

    fetchCustomers();
  }

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Customer Engagement Portal</h1>

      {/* Add Customer */}
      <form onSubmit={addCustomer} style={{ marginBottom: 20 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          style={{ marginLeft: 10 }}
        />
        <button type="submit" style={{ marginLeft: 10 }}>
          Add Customer
        </button>
      </form>

      {/* Customer Table */}
      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>

              <td>
                {editingId === c.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  c.name
                )}
              </td>

              <td>
                {editingId === c.id ? (
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  c.email
                )}
              </td>

              <td>{new Date(c.created_at).toLocaleString()}</td>

              <td>
                {editingId === c.id ? (
                  <>
                    <button onClick={() => updateCustomer(c.id)}>Save</button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditName("");
                        setEditEmail("");
                      }}
                      style={{ marginLeft: 5 }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(c.id);
                        setEditName(c.name);
                        setEditEmail(c.email);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCustomer(c.id)}
                      style={{ color: "red", marginLeft: 5 }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <footer
        style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: "1px solid #ccc",
        }}
      >
        <p>
          <strong>Abhishek Mane</strong>
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/Abhi09-htp"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/Abhi09-htp
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/abhishek-mane-0033a1327"
            target="_blank"
            rel="noreferrer"
          >
            https://www.linkedin.com/in/abhishek-mane-0033a1327
          </a>
        </p>
      </footer>
    </main>
  );
}
