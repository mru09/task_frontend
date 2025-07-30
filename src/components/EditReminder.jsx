import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReminder } from '../redux/slices/reminderSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

export default function EditReminder() {
  const [form, setForm] = useState({ title: '', description: '', date: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminders.items);

  useEffect(() => {
    const r = reminders.find((r) => r._id === id);
    if (r) {
      setForm({
        title: r.title,
        description: r.description,
        date: r.date.slice(0, 16),
      });
    }
  }, [id, reminders]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateReminder({ id, data: form }));
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5">Edit Reminder</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={form.title}
            margin="normal"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            value={form.description}
            margin="normal"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            fullWidth
            label="Date/Time"
            type="datetime-local"
            value={form.date}
            InputLabelProps={{ shrink: true }}
            margin="normal"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Update
          </Button>
        </form>
      </Box>
    </Container>
  );
}
