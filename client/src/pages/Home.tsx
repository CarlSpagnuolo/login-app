import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authService";

type User = {
  id: number;
  username: string;
  email: string;
};

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {
        localStorage.removeItem("token");

        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);
  function handleLogout() {
    localStorage.removeItem("token");

    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
        {user && (
          <h1 className="text-3xl font-bold mb-4">
            Bentornato {user.username}!
          </h1>
        )}

        <p className="text-gray-700 mb-2">
          <strong>Username:</strong> {user?.username}
        </p>

        <p className="text-gray-700 mb-6">
          <strong>Email:</strong> {user?.email}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
