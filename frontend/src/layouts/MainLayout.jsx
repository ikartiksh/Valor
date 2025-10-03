import { useState } from 'react';
import { Link } from 'react-router-dom';

function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">ContentValor</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">Menu</button>
        <div className="hidden md:flex space-x-4">
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
      {isSidebarOpen && (
        <aside className="md:hidden bg-white p-4 shadow-md">
          <ul className="space-y-2">
            <li><Link to="/">Home</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
          </ul>
        </aside>
      )}
      <main className="p-6">{children}</main>
    </div>
  );
}

export default MainLayout;