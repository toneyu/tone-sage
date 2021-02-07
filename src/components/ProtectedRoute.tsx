import React from 'react';
import { Redirect } from 'react-router-dom';

export const ProtectedRoute: React.FC<{}> = () => {
  const Component = this.props.component;
  // const isAuthenticated = ???;

  return isAuthenticated ? (
    <Component {...props} />
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
};

export default ProtectedRoute;
