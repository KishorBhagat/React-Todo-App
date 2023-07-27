import './App.css'
import GlobalStyle from "./GlobalStyle";
import Collections from "./pages/Collections";
import Dashboard from "./pages/Dashboard";
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleCollection from './pages/SingleCollection';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import { useEffect, useState } from 'react';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error404 from './pages/Error404';
import { useDispatch } from 'react-redux';
import { refreshLogin } from './store/slices/authSlice';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import ChangeEmail from './pages/ChangeEmail';


const SessionExpiredMsg = ({ closeToast }) => {
  return (
    <>
      <p style={{textAlign: "center"}}>Your session has expired. Please log in again to continue using the app.</p>
      <button 
        onClick={closeToast}
        style={{
          cursor: "pointer",
          border: "none",
          padding: "5px 10px",
          borderRadius: "3px",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "20px"
        }}
      >
        Log in
      </button>
    </>
  )
}


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  const ProtectedRoute = ({ children }) => {
    if (!accessToken) {
      return <Navigate to='/login' />
    }
    return children
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const relogging = setInterval(() => {
      if (accessToken) {
        // console.log("relogging");
        dispatch(refreshLogin())
          .unwrap()
          .then((res) => {
            if (res.error && res.error.name === "TokenExpiredError") {
              toast.error(<SessionExpiredMsg />, {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
                transition: Zoom,
                icon: false,
                autoClose: false,
                closeButton: false,
                draggable: false,
                closeOnClick: false,
                style: {
                  position: 'absolute',
                  marginTop: 'calc(50vh - 76px)',
                  pointerEvents: 'auto',
                },
                onOpen: () => {
                  document.body.style.pointerEvents = 'none';
                },
                onClose: () => {
                  window.location.replace('/login');
                }
              })
              localStorage.removeItem('accessToken');
              clearInterval(relogging);
            }
            else {
              localStorage.setItem('accessToken', (res.token.access));
            }
          })
      }
    }, (1000));

    return () => {
      clearInterval(relogging);
    };
  }, [dispatch])

  const theme = localStorage.getItem('theme');
  if(theme === 'light-theme'){
    document.body.classList = "light-theme";
  }
  else {
    document.body.classList = "dark-theme";
  }

  // useEffect(() => {
  //   const isFirstVisit = localStorage.getItem('isFirstVisit');

  //   if (isFirstVisit === null) {
  //     localStorage.setItem('isFirstVisit', 'true');
  //     window.location.reload();
  //   }
  // }, []);

  useEffect(() => {
    // Add a "beforeunload" event listener to the window to refresh the page when the user leaves or revisits.
    const handleBeforeUnload = () => {
      window.location.reload();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component is unmounted to avoid memory leaks.
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route exact path="/" element={!accessToken ? <LandingPage /> : <Dashboard />} />
          <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route exact path="/collections" element={<ProtectedRoute><Collections /></ProtectedRoute>} />
          <Route exact path="/collections/:collection" element={<ProtectedRoute><SingleCollection /></ProtectedRoute>} />
          <Route exact path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/changepassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
          <Route exact path="/changeemail" element={<ProtectedRoute><ChangeEmail /></ProtectedRoute>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/forgotpassword/verify" element={<VerifyOTP />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
