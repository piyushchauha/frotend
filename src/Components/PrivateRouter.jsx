import React from 'react';

//Protype
import PropTypes from 'prop-types';

//React-Router-Dom
import { Navigate } from 'react-router-dom';

//React-Redux
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user.email);

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
