import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const token = useSelector((state) => state.token);
    const role = useSelector((state) => state.role);

    if (!token) return <Navigate to="/login" replace />;
    if (allowedRoles.length && !allowedRoles.includes(role)) return <Navigate to="/" replace />;

    return children;
};

export default ProtectedRoute;
