import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, role, name } = useSelector((state) => state.auth);

  const linkStyle = {
    textDecoration: 'none',
  };

  const getButtonStyle = ({ isActive }) => ({
    color: isActive ? '#0d47a1' : '#fff',
    backgroundColor: isActive ? '#bbdefb' : 'transparent',
    fontWeight: isActive ? 'bold' : 500,
    borderRadius: 4,
    textTransform: 'none',
    padding: '6px 12px',
    minWidth: 'auto',
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const renderTabs = () => {
    if (!isAuthenticated) {
      return (
        <Stack direction="row" spacing={2}>
          <NavLink to="/login" style={linkStyle}>
            {({ isActive }) => (
              <Button sx={getButtonStyle({ isActive })}>Login</Button>
            )}
          </NavLink>
          <NavLink to="/register" style={linkStyle}>
            {({ isActive }) => (
              <Button sx={getButtonStyle({ isActive })}>Register</Button>
            )}
          </NavLink>
        </Stack>
      );
    }

    if (role === 'seller') {
      return (
        <Stack direction="row" spacing={1}>
          <NavLink to="/seller/products" style={linkStyle}>
            {({ isActive }) => (
              <Button sx={getButtonStyle({ isActive })}>Products</Button>
            )}
          </NavLink>
          <NavLink to="/seller/bundles" style={linkStyle}>
            {({ isActive }) => (
              <Button sx={getButtonStyle({ isActive })}>Bundles</Button>
            )}
          </NavLink>
          <Button onClick={handleLogout} sx={{ color: 'white' }}>
            Logout
          </Button>
        </Stack>
      );
    }

    if (role === 'user') {
      return (
        <Stack direction="row" spacing={1}>
          <NavLink to="/user/products" style={linkStyle}>
            {({ isActive }) => (
              <Button sx={getButtonStyle({ isActive })}>Products</Button>
            )}
          </NavLink>
          <NavLink to="/user/bundles" style={linkStyle}>
            {({ isActive }) => (
              <Button sx={getButtonStyle({ isActive })}>Bundles</Button>
            )}
          </NavLink>
          <NavLink to="/cart" style={linkStyle}>
            {({ isActive }) => (
              <Button sx={getButtonStyle({ isActive })}>Cart</Button>
            )}
          </NavLink>
          <Button onClick={handleLogout} sx={{ color: 'white' }}>
            Logout
          </Button>
        </Stack>
      );
    }

    return null;
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Hi! {name}
        </Typography>
        {renderTabs()}
      </Toolbar>
    </AppBar>
  );
}
