"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await registerUser(name, email, password);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <br /><br />
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br /><br />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br /><br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
