import './App.css'
import GlobalStyle from "./GlobalStyle";
import Collections from "./pages/Collections";
import Dashboard from "./pages/Dashboard";
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleCollection from './pages/SingleCollection';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';

function App() {
  const isAuthenticated = true;
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to='/login' />
    }
    return children;
  }


  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route exact path="/collections" element={<ProtectedRoute><Collections /></ProtectedRoute>} />
          <Route exact path="/collections/:collection" element={<ProtectedRoute><SingleCollection /></ProtectedRoute>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/forgotpassword/verify" element={<VerifyOTP />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
