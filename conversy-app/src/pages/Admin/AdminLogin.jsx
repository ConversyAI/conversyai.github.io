import { useState } from 'react';
import { motion } from 'framer-motion';
import { loginAdmin } from '../../firebase';
import toast from 'react-hot-toast';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await loginAdmin(email, password);

    if (result.success) {
      toast.success('Logged in successfully!');
      onLoginSuccess(result.user);
    } else {
      toast.error(result.error || 'Login failed. Please check your credentials.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/assets/logo.png"
              alt="Conversy AI"
              className="h-16 mx-auto mb-4 opacity-90 hover:opacity-100 transition-opacity duration-300"
              style={{ filter: 'drop-shadow(0 0 20px rgba(110, 231, 255, 0.2))' }}
            />
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-brand-muted mt-2">Sign in to manage your site</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-brand-text font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                placeholder="admin@conversyai.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-brand-text font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-brand-bg font-bold text-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-brand-bg/50 rounded-lg">
            <p className="text-brand-muted text-sm text-center">
              If you don't have access, contact your administrator
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
