import './App.css'
import GlobalStyle from "./GlobalStyle";
import Collections from "./pages/Collections";
import Dashboard from "./pages/Dashboard";
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from './pages/Layout';

function App() {
  const isAuthenticated = true;
  const ProtectedRoute = ({children}) => {
    if(!isAuthenticated){
      return <Navigate to='/login'/>
    }
    return children;
  }


  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          {/* <Route exact path="/" 
            element={ 
              !isAuthenticated ? 
              <LandingPage /> 
              : 
              <Layout>
                <Dashboard />
              </Layout>
            } 
          /> */}
          <Route 
            exact 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            exact 
            path="/collections" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Collections />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
