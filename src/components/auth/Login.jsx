import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';

const API = process.env.REACT_APP_API_URL;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/${role}/login`, { email, password });
      const token = res.data.token;
      const name = res.data.name;

      dispatch(loginSuccess({ token, role, name }));
      navigate(`/${role}/products`);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" mb={3} align="center">
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            select
            label="Login As"
            value={role}
            fullWidth
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </TextField>
          <Button variant="contained" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
