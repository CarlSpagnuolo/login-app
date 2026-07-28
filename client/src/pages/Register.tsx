import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import CyberBackground from "../components/CyberBackground";
import AudioToggle from "../components/AudioToggle";

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
    if (username.trim().length < 3) {
      setError("Lo username deve contenere almeno 3 caratteri");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Inserisci un'email valida");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "La password deve contenere almeno 8 caratteri, una lettera maiuscola e un numero",
      );
      return;
    }
    setLoading(true);

    try {
      const result = await registerUser(username, email, password);

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);

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
    <CyberBackground>
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="
                relative
max-w-xl
text-center
bg-[#050816]/85
backdrop-blur-md
border
border-cyan-600/30
rounded-2xl
p-10
shadow-[0_0_70px_rgba(0,245,255,0.08),0_0_90px_rgba(236,72,153,0.08)]
animate-[slideUp_0.8s_ease-out_0.8s_forwards]
opacity-0
before:absolute
before:inset-0
before:rounded-2xl
before:bg-linear-to-r
before:from-cyan-400/5
before:via-transparent
before:to-fuchsia-500/5
before:pointer-events-none
  "
        >
          <AudioToggle />
          <h1
            className="
                text-3xl
                font-bold
                mb-6
                bg-linear-to-r
                from-cyan-400
                to-purple-500
                bg-clip-text
                text-transparent
              "
          >
            Registrati
          </h1>
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <input
            type="text"
            placeholder="Username"
            className="border p-2 w-full mb-4 text-cyan-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-4 text-cyan-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4 text-cyan-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="
                  px-6
                  py-3
                  rounded-lg
                  bg-cyan-500/10
                  border
                  border-cyan-400/40
                  text-cyan-300
                  hover:bg-cyan-400/20
                  transition
                  duration-300
                 disabled:bg-gray-600
                  disabled:cursor-not-allowed
                  cursor cursor-pointer"
          >
            {loading ? "Registrazione..." : "Registrati"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-500">
            Hai già un account?{" "}
            <Link
              to="/login"
              className="text-purple-400/90 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </CyberBackground>
  );
}

export default Register;
