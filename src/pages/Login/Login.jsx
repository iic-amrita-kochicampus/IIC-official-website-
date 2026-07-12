import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Lock, Mail, Lightbulb } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await signIn(data.email, data.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-slate-900 to-primary p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-dark">Admin Login</h1>
            <p className="text-slate-500 text-sm mt-1">IIC Portal Administration</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" {...register('email', { required: 'Email is required' })} className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="admin@institution.edu" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" {...register('password', { required: 'Password is required' })} className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Enter password" />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
