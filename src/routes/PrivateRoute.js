import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const avtorization_id = localStorage.getItem('avtorization_id');
  return avtorization_id ? Component : <Navigate to={redirectTo} />;
};
PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
