import { Navigate } from "react-router-dom";

function RequireAuth({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default RequireAuth;
