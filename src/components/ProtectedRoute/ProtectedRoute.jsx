import React from "react";
import { Navigate } from "react-router-dom";

// 🔐 Redirect if not logged in
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
