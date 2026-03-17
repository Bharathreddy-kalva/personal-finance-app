import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { registerUser } from '@/services/authService';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = `${firstName} ${lastName}`.trim();

    if (!firstName || !lastName || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        fullName,
        email,
        password,
      });

      alert(response.message);
      navigate('/login');
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-[45%] bg-primary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,hsl(243,55%,62%,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,hsl(156,52%,43%,0.12),transparent_50%)]" />
        <div className="relative z-10 max-w-md">
          <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mb-10">
            <Wallet className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground tracking-tight mb-4 leading-[1.15]">
            Your money, simplified.
          </h1>
          <p className="text-primary-foreground/65 text-base leading-relaxed">
            Join thousands of users who trust Vault to manage their finances smarter.
          </p>
          <div className="mt-14 grid grid-cols-3 gap-6 text-center">
            {[
              { value: '50K+', label: 'Active users' },
              { value: '$2B+', label: 'Tracked' },
              { value: '4.9★', label: 'App Store' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-primary-foreground tracking-tight">{value}</p>
                <p className="text-[11px] text-primary-foreground/40 mt-0.5">{label}</p>
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

          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">Create your account</h2>
          <p className="text-sm text-muted-foreground mb-8">Start managing your finances in minutes.</p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                  First name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Alex"
                  className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                  Last name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Chen"
                  className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/30 transition-all"
                />
              </div>
            </div>

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
              <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-[11px] text-muted-foreground text-center mt-4">
            By signing up, you agree to our <Link to="#" className="text-primary hover:underline">Terms</Link> and{' '}
            <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}