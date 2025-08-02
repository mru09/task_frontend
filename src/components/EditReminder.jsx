import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReminder, clearStatus } from '../redux/slices/reminderSlice';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

export default function EditReminder() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminders.items);
  const success = useSelector((state) => state.reminders.success);

  useEffect(() => {
    dispatch(clearStatus());

    const r = reminders.find((r) => r._id === id);
    if (r) {
      const reminderDate = new Date(r.date);
      const offsetDate = new Date(reminderDate.getTime() - reminderDate.getTimezoneOffset() * 60000);

      setForm({
        title: r.title,
        description: r.description,
        date: offsetDate.toISOString().slice(0, 10),
        time: offsetDate.toISOString().slice(11, 16),
      });
    }
  }, [id, reminders, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.date || !form.time) {
      alert('All fields are required.');
      return;
    }

    const combinedDateTime = new Date(`${form.date}T${form.time}`);
    await dispatch(
      updateReminder({
        id,
        data: {
          title: form.title,
          description: form.description,
          date: combinedDateTime.toISOString(),
        },
      })
    );

    navigate('/');
  };

  const handleCancel = () => {
    dispatch(clearStatus());
    navigate('/');
  };

  const handleCloseSnackbar = () => {
    dispatch(clearStatus());
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Edit Reminder
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Title"
            value={form.title}
            margin="normal"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            required
            fullWidth
            label="Description"
            value={form.description}
            margin="normal"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            required
            fullWidth
            label="Date"
            type="date"
            value={form.date}
            InputLabelProps={{ shrink: true }}
            margin="normal"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <TextField
            required
            fullWidth
            label="Time"
            type="time"
            value={form.time}
            InputLabelProps={{ shrink: true }}
            margin="normal"
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
          <Box display="flex">
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Update
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 2, ml: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
}
