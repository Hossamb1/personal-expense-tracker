import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Expense Tracker
        </h1>
        <p className="text-gray-600 mb-8">
          Track your spending, manage your budget, and take control of your
          finances.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-200">
            <Link to="/login">Log in</Link>
          </button>
          <button className="bg-white text-blue-600 border border-blue-600 font-semibold px-6 py-2 rounded-xl hover:bg-blue-50 transition duration-200">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
