import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Pages & Components
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      {/* Global Toast Notifications Styled to match the theme */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!bg-zinc-950 !border !border-white/10 !rounded-xl !shadow-[0_0_20px_rgba(244,114,182,0.1)]"
        progressClassName="!bg-sakura-pink"
      />

      {/* Route Configuration */}
      <Routes>
        {/* Redirect base URL to login for now */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Require Authentication) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* We will add these future routes inside this wrapper later: */}
          {/* <Route path="/new-review" element={<NewReview />} /> */}
          {/* <Route path="/history" element={<History />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;