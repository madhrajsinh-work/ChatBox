import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};

    const validUsernames = ['rushi.padhya', 'madhrajsinh.parmar'];
    const validPassword = 'jaymataji';

    if (!formData.emailOrUsername) {
      errs.emailOrUsername = 'Username is required';
    } else if (!validUsernames.includes(formData.emailOrUsername.trim())) {
      errs.emailOrUsername = 'Invalid username';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password !== validPassword) {
      errs.password = 'Invalid password';
    }

    setErrors(errs);

    // Returns true if no errors
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: '' })); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert('Login successful!');
      navigate('/chat');  // Redirect to chat.jsx page route (make sure route exists)
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
        padding: 2
      }}
    >
      <Grid item xs={12} sm={10} md={6} lg={4}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)'
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            ChatBox
          </Typography>

          <Typography variant="body1" align="center" gutterBottom sx={{ fontSize: '16px' }}>
            Please login to your account
          </Typography>

          <Box component="form" onSubmit={handleSubmit} mt={3}>
            <TextField
              label="Username"
              name="emailOrUsername"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.emailOrUsername}
              onChange={handleChange}
              required
              size="small"
              error={Boolean(errors.emailOrUsername)}
              helperText={errors.emailOrUsername}
              sx={{ fontSize: '16px' }}
            />

            <TextField
              label="Password"
              name="password"
              fullWidth
              margin="normal"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              size="small"
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={{ fontSize: '16px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Link href="#" underline="hover" variant="body2">
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '16px',
                textTransform: 'none',
                borderRadius: 2
              }}
            >
              Login
            </Button>

            <Box display="flex" justifyContent="center" mt={3}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="hover"
                  sx={{ fontWeight: 'bold' }}
                >
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
