// src/components/auth/Register.jsx

import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function Register() {
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

   const handleRegister = async () => {
    try {
      await axios.post(`${API}/api/${role}/register`, {
        name,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" mb={3} align="center">Register</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            value={name}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
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
            label="Register As"
            value={role}
            fullWidth
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </TextField>
          <Button
            variant="contained"
            fullWidth
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
