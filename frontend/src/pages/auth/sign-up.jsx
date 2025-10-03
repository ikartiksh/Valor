import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import api from '../../services/api';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Signup failed: ' + (err.response?.data?.message || 'Try again'));
    }
  };

  return (
    <Card color="transparent" shadow={false} className="max-w-md mx-auto mt-8 p-6">
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Email
          </Typography>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            placeholder="name@mail.com"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
          />
        </div>
        <div className="mb-4">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Password
          </Typography>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            placeholder="********"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
          />
        </div>
        {error && (
          <Typography color="red" className="mb-4">
            {error}
          </Typography>
        )}
        <Button type="submit" className="mt-6 bg-blue-500" fullWidth>
          Sign Up
        </Button>
      </form>
    </Card>
  );
}

export default SignUp;