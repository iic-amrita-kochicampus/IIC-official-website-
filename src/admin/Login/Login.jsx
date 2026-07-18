import { useState, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { Lock, Mail, Lightbulb, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 24, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

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
    <div className="admin-root min-h-screen flex items-stretch">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-void items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] rounded-full bg-innovation-blue/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full bg-innovation-orange/15 blur-[120px]" />
        <div className="relative text-center px-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-innovation-blue to-innovation-orange flex items-center justify-center">
            <Lightbulb className="text-void" size={30} />
          </div>
          <h2 className="font-display text-3xl text-paper leading-tight">
            Institution&apos;s <span className="gradient-text">Innovation</span> Council
          </h2>
          <p className="mt-4 text-fog text-sm max-w-sm mx-auto">
            Manage members, events, ideas and research from a single control room.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-admin-bg">
        <div ref={cardRef} className="w-full max-w-md">
          <div className="admin-card p-8">
            <div className="mb-8 lg:hidden text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Lightbulb className="text-white" size={24} />
              </div>
            </div>
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-dark">Welcome back</h1>
              <p className="text-admin-muted text-sm mt-1">Sign in to the IIC admin dashboard</p>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="admin-label">Email</label>
                <div className="relative">
                  <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-muted" />
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="admin-input pl-10"
                    placeholder="admin@institution.edu"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="admin-label">Password</label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-muted" />
                  <input
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    className="admin-input pl-10"
                    placeholder="Enter password"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <Button type="submit" disabled={loading} className="w-full mt-2" size="lg" icon={loading ? undefined : ArrowRight}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
