import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/Dashboard';
import AddReminder from './components/AddReminder'
import EditReminder from './components/EditReminder'

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={token ? <AddReminder /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={token ? <EditReminder /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
