import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { getSession } from "./session";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  return getSession("user") ? children : <Navigate to="/SignIn" replace state={{ from: location.pathname }} />;
}

ProtectedRoute.propTypes = { children: PropTypes.node.isRequired };
