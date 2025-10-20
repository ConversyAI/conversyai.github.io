import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { logoutAdmin, getStats, getAllWaitlist, getInterviews } from '../../firebase';
import toast from 'react-hot-toast';
import StatsManager from './StatsManager';
import TestimonialsManager from './TestimonialsManager';
import WaitlistViewer from './WaitlistViewer';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [waitlist, setWaitlist] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statsData, waitlistData, testimonialsData] = await Promise.all([
        getStats(),
        getAllWaitlist(),
        getInterviews(100),
      ]);

      setStats(statsData);
      setWaitlist(waitlistData);
      setTestimonials(testimonialsData);
    } catch (error) {
      toast.error('Error loading data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const result = await logoutAdmin();
    if (result.success) {
      toast.success('Logged out successfully');
      onLogout();
    } else {
      toast.error('Error logging out');
    }
  };

  const tabs = [
    { id: 'stats', label: 'Stats', icon: '📊' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'waitlist', label: 'Waitlist', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-brand-panel/50 backdrop-blur-sm border-b border-brand-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="Conversy AI" className="h-8" />
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-brand-text font-medium">{user?.email}</p>
                <p className="text-xs text-brand-muted">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text hover:border-brand-primary hover:bg-brand-primary/10 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-brand-panel/30 border-b border-brand-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'text-brand-primary border-b-2 border-brand-primary'
                    : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary/20 border-t-brand-primary"></div>
          </div>
        ) : (
          <>
            {activeTab === 'stats' && (
              <StatsManager stats={stats} onUpdate={fetchData} />
            )}
            {activeTab === 'testimonials' && (
              <TestimonialsManager
                testimonials={testimonials}
                onUpdate={fetchData}
              />
            )}
            {activeTab === 'waitlist' && (
              <WaitlistViewer waitlist={waitlist} onUpdate={fetchData} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
