import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
  const { isAuthenticated, type } = props;
  console.log('isAuth; ', isAuthenticated)
  if (type === 'guest' && isAuthenticated) {
    return <Redirect to="/" />;
  } else if (type === 'private' && !isAuthenticated) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props} />;
  }
};

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(AuthRoute);