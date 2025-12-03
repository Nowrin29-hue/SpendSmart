import { useState } from "react";
import api from "../lib/api.js";

function Signup({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/signup", {
        username,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      onSuccess(); // redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="form-card">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Choose a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="form-error-message">{error}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
