import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReminders, deleteReminder } from '../redux/slices/reminderSlice';
import { logout } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.reminders);

  useEffect(() => {
    dispatch(fetchReminders());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Container>
      <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Reminders</Typography>
        <Button onClick={handleLogout} variant="outlined">Logout</Button>
      </Box>

      <Button
        component={Link}
        to="/add"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Add Reminder
      </Button>

      <List>
        {items.map((reminder) => (
          <ListItem key={reminder._id} divider>
            <ListItemText
              primary={reminder.title}
              secondary={`${reminder.description} — ${new Date(reminder.date).toLocaleString()}`}
            />
            <IconButton component={Link} to={`/edit/${reminder._id}`}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(deleteReminder(reminder._id))}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
