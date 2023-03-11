import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, component }) => {
  if (!isLoggedIn) {
    return (<Navigate to='/' replace />);
  }

  return component;
};

export default ProtectedRoute;