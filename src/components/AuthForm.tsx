// src/components/AuthForm.tsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthForm() {
  const { login, signup, user, logout, loading } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  // ✅ If logged in → show logout + profile
  if (user) {
    return (
      <div className="p-4 border rounded-lg shadow max-w-md mx-auto text-center">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-16 h-16 rounded-full mx-auto mb-2"
        />
        <h2 className="text-lg font-bold">Welcome, {user.name}!</h2>
        <p className="text-gray-600">{user.email}</p>
        <button
          onClick={logout}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  // ✅ If not logged in → show login/signup form
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg shadow max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p className="text-center text-sm">
        {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="text-blue-500 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </form>
  );
}
