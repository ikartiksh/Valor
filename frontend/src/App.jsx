import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidenav from './widgets/layout/sidenav';
import { ThemeProvider } from '@material-tailwind/react';
import DashboardNavbar from './widgets/layout/dashboard-navbar';
import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';
import Home from './pages/dashboard/home';
import Profile from './pages/dashboard/profile';
import Tables from './pages/dashboard/tables';
import Notifications from './pages/dashboard/notifications';
import routes from './routes';
import { MaterialTailwindControllerProvider } from './context';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/auth/sign-in" />;
  };

  return (
    <ThemeProvider>
      <MaterialTailwindControllerProvider>
      <Router>
        <Routes>
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-blue-gray-50/50">
                  <Sidenav routes={routes} />
                  <div className="p-4 xl:ml-80">
                    <DashboardNavbar />
                    <Routes>
                      <Route path="home" element={<Home />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="tables" element={<Tables />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="*" element={<Navigate to="home" />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/auth/sign-in" />} />
        </Routes>
      </Router>
      </MaterialTailwindControllerProvider>
    </ThemeProvider>
  );
}

export default App;