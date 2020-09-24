import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { login } from './actions/Actions';

// export default connect(null, { login })(props => {
export default connect(null)(props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = () => {
    console.log('submit', email, password)
    props.dispatch(login({ email, password }));
  };

  return (
    <form>
      <Typography variant="h5" style={{ marginBottom: 8 }}>
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        className="form-input"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        className="form-input"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="form-input"
        size="large"
        onClick={submitForm}
      >
        Login
      </Button>
    </form>
  );
});