import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center w-96">
        <h1 className="text-3xl font-bold mb-4">
          Benvenuto nel mio primo progetto Full Stack!
        </h1>

        <p className="text-gray-600 mb-8">
          Applicazione realizzata con React, Express.js e PostgreSQL.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Registrati
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
