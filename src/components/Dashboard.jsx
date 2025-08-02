import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReminders,
  deleteReminder,
  clearStatus,
} from '../redux/slices/reminderSlice';
import {
  Container, Typography, Button, Box, List, ListItem, ListItemText,
  IconButton, CircularProgress, Alert, Snackbar, Pagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, loading, error, success, totalPages, currentPage } = useSelector((state) => state.reminders);

  useEffect(() => {
    dispatch(fetchReminders(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (_, value) => {
    dispatch(fetchReminders(value));
  };

  const handleCloseSnackbar = () => {
    dispatch(clearStatus());
  };

  return (
    <Container>
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      )}

      {!loading && items.length === 0 && (
        <Typography variant="body1" mt={4}>
          No reminders found.
        </Typography>
      )}

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

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

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
