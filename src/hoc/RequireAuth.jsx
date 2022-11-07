import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RequireAuth = ({ children }) => {
  const { isAuthorized } = useSelector((state) => state.personLogIn);
  const location = useLocation();
  if (!isAuthorized) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return children;
};
