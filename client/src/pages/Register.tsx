import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!username || !email || !password) {
      setError("Compila tutti i campi");
      return;
    }
    setLoading(true);

    try {
      const result = await registerUser(username, email, password);

      localStorage.setItem("user", JSON.stringify(result.user));

      localStorage.setItem(
        "welcomeMessage",
        `Benvenuto ${result.user.username}!`,
      );

      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-3xl font-bold mb-6">Registrati</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded w-full cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Registrazione..." : "Registrati"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Hai già un account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
