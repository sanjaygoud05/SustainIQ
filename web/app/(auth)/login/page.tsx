"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(email, password);
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br /><br />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br /><br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>No account? <a href="/register">Register</a></p>
    </div>
  );
}