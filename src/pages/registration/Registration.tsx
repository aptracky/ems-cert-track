import React from "react";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Button,
  TextField,
  Alert,
  Grid,
  Link,
} from "@mui/material";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);
  let navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  // establishes a user account with entered information
  async function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      setAlert(false);
      setVisible(true);
      setEmail(username);
      console.log(user);
    } catch (error) {
      setAlert(true);
      console.log("error signing up:", error);
    }
  }
  // Confirms account information after user signup
  async function confirmSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await Auth.confirmSignUp(username, code);
      navigate("/login");
      return true;
    } catch (error) {
      setAlert(true);
      console.log("error confirming sign up", error);
    }
  }

  return (
    <>
      {!visible && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Register Account
            </Typography>
            <Box component="form" onSubmit={signUp} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={username}
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {alert ? (
                <Alert severity="error">
                  Improper registration info entered
                </Alert>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link
                    component="button"
                    onClick={() => navigate("/login")}
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link
                    component="button"
                    onClick={() => setVisible(true)}
                    variant="body2"
                  >
                    Confirm with a unique access code
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}

      {visible && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Confirm Authentication Code
            </Typography>
            <Box component="form" onSubmit={confirmSignUp} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Authentication Code"
                label="Authentication Code"
                type="Authentication Code"
                id="Authentication Code"
                autoComplete="current-password"
                onChange={(e) => setCode(e.target.value)}
              />
              {alert ? (
                <Alert severity="error">
                  Improper account confirmation information entered
                </Alert>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Authenticate
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link
                    component="button"
                    onClick={() => navigate("/login")}
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Registration;
