import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  username: string;
  email: string;
};

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedMessage = localStorage.getItem("welcomeMessage");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));

    if (savedMessage) {
      setWelcomeMessage(savedMessage);
      localStorage.removeItem("welcomeMessage");
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
        {welcomeMessage && (
          <h1 className="text-3xl font-bold mb-4">{welcomeMessage}</h1>
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
