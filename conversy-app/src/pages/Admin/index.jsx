import { useState, useEffect } from 'react';
import { onAuthChange } from '../../firebase';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { Toaster } from 'react-hot-toast';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary/20 border-t-brand-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0d1220',
            color: '#eaf2ff',
            border: '1px solid rgba(110, 231, 255, 0.2)',
          },
        }}
      />
      {user ? (
        <AdminDashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <AdminLogin onLoginSuccess={setUser} />
      )}
    </>
  );
};

export default Admin;
