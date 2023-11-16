import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const avtorization_id = localStorage.getItem('avtorization_id');
  return avtorization_id ? <Navigate to={redirectTo} /> : Component;
};
RestrictedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
