import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const verifikation_id = localStorage.getItem('verifikation_id');
  return verifikation_id ? Component : <Navigate to={redirectTo} />;
};
PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  redirectTo: PropTypes.string.isRequired,
};