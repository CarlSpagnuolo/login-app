import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authService";
import CyberBackground from "../components/CyberBackground";
import AudioToggle from "../components/AudioToggle";

type User = {
  id: number;
  username: string;
  email: string;
};

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");
      const message = localStorage.getItem("welcomeMessage");
      if (message) {
        setWelcomeMessage(message);
        localStorage.removeItem("welcomeMessage");
      }

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

  function HandleGoHome() {
    navigate("/landing", {
      state: {
        startBoot: false,
      },
    });
  }

  function handleLogout() {
    localStorage.removeItem("token");

    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <CyberBackground>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div
          className="
  relative
  w-175
  max-w-2xl
  text-center
  bg-[#050816]/85
  backdrop-blur-md
  border
  border-cyan-600/30
  rounded-2xl
  p-14
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
          {user && (
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
              {welcomeMessage || `Welcome back ${user?.username}!`}
            </h1>
          )}

          <p className="text-cyan-600 mb-2">
            <strong>Username:</strong> {user?.username}
          </p>

          <p className="text-cyan-600 mb-6">
            <strong>Email:</strong> {user?.email}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={HandleGoHome}
              className=" px-6
                  py-3
                  rounded-lg
                  bg-cyan-500/10
                  border
                  border-cyan-400/40
                  text-cyan-300
                  hover:bg-cyan-400/20
                  transition
                  duration-300
                  cursor cursor-pointer
                "
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="px-6
                  py-3
                  rounded-lg
                  bg-purple-500/10
                  border
                  border-purple-400/40
                  text-purple-300
                  hover:bg-purple-400/20
                  transition
                  duration-300
                  cursor cursor-pointer
                "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </CyberBackground>
  );
}

export default Home;
