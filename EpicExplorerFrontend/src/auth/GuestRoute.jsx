import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getSession } from "./session";

export default function GuestRoute({ children }) {
  if (getSession("admin")) return <Navigate to="/admin" replace />;
  if (getSession("user")) return <Navigate to="/dashboard" replace />;
  return children;
}

GuestRoute.propTypes = { children: PropTypes.node.isRequired };
