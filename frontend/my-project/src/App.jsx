import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivatePage from "./pages/PrivatePage";
import DoctorList from "./pages/DoctorList";
import DoctorDetail from "./pages/DoctorDetail";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorProfileForm from "./pages/DoctorProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/action";
import Home from "./pages/Home";

const Navbar = () => {
  const role = useSelector((s) => s.role);      // 'user' | 'doctor' | ''
  const token = useSelector((s) => s.token);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  return (
<nav className="bg-gray-800 text-white px-6 py-3 flex items-center">
      {/* ─── Logo ─────────────────────────────────────── */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-white text-blue-600">
          🩺
        </span>
        <span>MediConnect</span>
      </Link>

      {/* ─── Main menu links ──────────────────────────── */}
      <div className="flex-1 flex items-center gap-6 ml-10">
        <Link to="/">Home</Link>

        {role === "user" && (
          <>
            <Link to="/doctors">Doctors</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}

        {role === "doctor" && (
          <>
            <Link to="/doctors/profile">My Profile</Link>
            <Link to="/doctor-dashboard">Dashboard</Link>
          </>
        )}
      </div>

      {/* ─── Auth / Logout section (right‑aligned) ───── */}
      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="border border-white px-3 py-1 rounded hover:bg-white hover:text-gray-800 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>  );
};

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/private" element={<ProtectedRoute> <PrivatePage /> </ProtectedRoute>} />
      <Route path="/doctors" element=
        {
          <ProtectedRoute allowedRoles={["user", "doctor"]}>
            <DoctorList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/:id"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <DoctorDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor-dashboard"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorProfileForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
