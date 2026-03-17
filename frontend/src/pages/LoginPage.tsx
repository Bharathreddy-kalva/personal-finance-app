import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, Eye, EyeOff, Shield, Lock, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loginUser } from '@/services/authService';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify(response));
      alert(response.message);
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-[45%] bg-primary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,hsl(243,55%,62%,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,hsl(156,52%,43%,0.12),transparent_50%)]" />
        <div className="relative z-10 max-w-md">
          <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mb-10">
            <Wallet className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground tracking-tight mb-4 leading-[1.15]">
            Take control of your finances.
          </h1>
          <p className="text-primary-foreground/65 text-base leading-relaxed">
            Connect your bank accounts, track spending, and hit your savings goals — all in one place.
          </p>
          <div className="mt-14 space-y-3">
            {[
              { icon: Shield, text: '256-bit AES encryption' },
              { icon: Lock, text: 'Bank-grade security protocols' },
              { icon: Fingerprint, text: 'SOC 2 Type II compliant' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-primary-foreground/50 text-sm">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary-foreground/40" />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-card">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <span
              className="text-xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Vault
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-8">Sign in to your account to continue.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@email.com"
                className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/30 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                <Link to="#" className="text-[12px] text-primary font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-3.5 pr-10 rounded-xl border border-input bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl active:scale-[0.98] transition-transform font-semibold"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
              or continue with
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 rounded-xl">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-11 rounded-xl">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}