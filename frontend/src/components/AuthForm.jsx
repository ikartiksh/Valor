import { useState } from 'react';
import api from '../services/api';

function AuthForm({ type, setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = type === 'login' ? '/auth/login' : '/auth/signup';
      const res = await api.post(endpoint, { email, password });
      localStorage.setItem('token', res.data.token);
      setAuth(true);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid credentials or error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl mb-4">{type === 'login' ? 'Login' : 'Signup'}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-4 p-2 border w-full"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-4 p-2 border w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        {type === 'login' ? 'Login' : 'Signup'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default AuthForm;