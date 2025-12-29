import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/button';
import Input from '../../components/common/input';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Please enter your details to sign in.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            required
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            required
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link 
              to="/forgot-password" 
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            loading={loading}
          >
            Log In
          </Button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;