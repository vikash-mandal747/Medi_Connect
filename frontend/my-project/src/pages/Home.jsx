import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">
        Welcome to MediConnect
      </h1>
      <p className="text-gray-700 max-w-xl mb-6 text-lg">
        MediConnect is a smart health appointment system that connects
        <strong> patients</strong> with <strong>doctors</strong>. Book
        appointments, manage schedules, and get care — all in one place.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Get Started
        </Link>
        <Link to="/doctors" className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-100">
          Browse Doctors
        </Link>
      </div>

      <div className="mt-12 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-3">What You Can Do</h2>
        <ul className="text-left text-gray-700 space-y-2">
          <li>✓ Create doctor and user accounts</li>
          <li>✓ Book or manage appointment slots</li>
          <li>✓ See your appointment history</li>
          <li>✓ Doctors manage their availability & see patients</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
