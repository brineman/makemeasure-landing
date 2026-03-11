import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: window.location.origin
        }
      });
      if (error) setError(error.message);else
      setMessage('Check your email to confirm your account.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);else
      navigate('/app');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--cream))' }}>
      <div className="w-full max-w-md px-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="3" fill="#1A1A1A" />
              <circle cx="14" cy="4" r="2" fill="#1A1A1A" />
              <circle cx="14" cy="24" r="2" fill="#1A1A1A" />
              <circle cx="4" cy="14" r="2" fill="#1A1A1A" />
              <circle cx="24" cy="14" r="2" fill="#1A1A1A" />
              <circle cx="6.5" cy="6.5" r="2" fill="#1A1A1A" />
              <circle cx="21.5" cy="21.5" r="2" fill="#1A1A1A" />
              <circle cx="21.5" cy="6.5" r="2" fill="#1A1A1A" />
              <circle cx="6.5" cy="21.5" r="2" fill="#1A1A1A" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-widest uppercase" style={{ letterSpacing: '0.25em' }}>
            ATRIUM
          </span>
        </div>

        <h1 className="text-2xl font-medium mb-2">
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </h1>
        <p className="text-sm mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {mode === 'login' ?
          'Access your creative operations platform.' :
          'Join your team on Atrium.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' &&
          <div>
              <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Display Name
              </label>
              <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
              style={{ backgroundColor: 'hsl(var(--muted))', border: 'none' }} />

            </div>
          }
          <div>
            <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
              style={{ backgroundColor: 'hsl(var(--muted))', border: 'none' }} placeholder="you@gmail.com" />

          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
              style={{ backgroundColor: 'hsl(var(--muted))', border: 'none' }} />

          </div>

          {error &&
          <p className="text-xs" style={{ color: 'hsl(var(--destructive))' }}>{error}</p>
          }
          {message &&
          <p className="text-xs" style={{ color: 'hsl(var(--status-in-progress))' }}>{message}</p>
          }

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-medium text-white disabled:opacity-50 transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'hsl(var(--charcoal))' }}>

            {loading ? '...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => {setMode(mode === 'login' ? 'signup' : 'login');setError('');setMessage('');}}
            className="underline font-medium"
            style={{ color: 'hsl(var(--foreground))' }}>

            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>);

}
