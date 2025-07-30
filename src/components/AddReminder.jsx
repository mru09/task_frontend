import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReminder } from '../redux/slices/reminderSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

export default function AddReminder() {
  const [form, setForm] = useState({ title: '', description: '', date: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addReminder(form));
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5">Add Reminder</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            fullWidth
            label="Date/Time"
            type="datetime-local"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Add
          </Button>
        </form>
      </Box>
    </Container>
  );
}
