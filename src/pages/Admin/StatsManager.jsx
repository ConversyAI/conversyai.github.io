import { useState } from 'react';
import { motion } from 'framer-motion';
import { updateStats, syncWaitlistCount } from '../../firebase';
import toast from 'react-hot-toast';

const StatsManager = ({ stats, onUpdate }) => {
  const [formData, setFormData] = useState({
    linkedinFollowers: stats?.linkedinFollowers || 0,
    linkedinPageViews: stats?.linkedinPageViews || 0,
    instagramFollowers: stats?.instagramFollowers || 0,
    productInterest: stats?.productInterest || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await updateStats(formData);

    if (result.success) {
      toast.success('Stats updated successfully!');
      onUpdate();
    } else {
      toast.error('Failed to update stats');
    }

    setIsSubmitting(false);
  };

  const handleSyncWaitlist = async () => {
    setIsSyncing(true);

    const result = await syncWaitlistCount();

    if (result.success) {
      toast.success(`Waitlist count synced! Count: ${result.count}`);
      onUpdate(); // Refresh stats
    } else {
      toast.error('Failed to sync waitlist count');
    }

    setIsSyncing(false);
  };

  const statsInfo = [
    {
      name: 'linkedinFollowers',
      label: 'LinkedIn Followers',
      description: 'Total number of followers on your LinkedIn page',
      icon: '👥',
    },
    {
      name: 'linkedinPageViews',
      label: 'LinkedIn Page Views',
      description: 'Total views on your LinkedIn page',
      icon: '👁️',
    },
    {
      name: 'instagramFollowers',
      label: 'Instagram Followers',
      description: 'Total number of followers on your Instagram account',
      icon: '📸',
    },
    {
      name: 'productInterest',
      label: 'Product Interest Count',
      description: 'Number of people who showed interest in your product',
      icon: '⭐',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-brand-text mb-2">Manage Stats</h2>
        <p className="text-brand-muted">Update your website statistics. These numbers will be displayed on the public site.</p>
      </div>

      {/* Current Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-xl p-4">
          <p className="text-brand-muted text-sm mb-1">Unique Visitors</p>
          <p className="text-2xl font-bold text-brand-text">{stats?.uniqueVisitors || 0}</p>
          <p className="text-xs text-brand-muted mt-1">Auto-tracked</p>
        </div>
        <div className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-xl p-4">
          <p className="text-brand-muted text-sm mb-1">Total Page Views</p>
          <p className="text-2xl font-bold text-brand-text">{stats?.totalPageViews || 0}</p>
          <p className="text-xs text-brand-muted mt-1">Auto-tracked</p>
        </div>
        <div className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-xl p-4 relative">
          <p className="text-brand-muted text-sm mb-1">Waitlist Members</p>
          <p className="text-2xl font-bold text-brand-text">{stats?.waitlistCount || 0}</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-brand-muted">Auto-counted</p>
            <button
              onClick={handleSyncWaitlist}
              disabled={isSyncing}
              className="text-xs px-2 py-1 bg-brand-primary/20 hover:bg-brand-primary/30 text-brand-primary rounded transition-colors disabled:opacity-50"
              title="Sync with actual document count"
            >
              {isSyncing ? 'Syncing...' : 'Sync Count'}
            </button>
          </div>
        </div>
        <div className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-xl p-4">
          <p className="text-brand-muted text-sm mb-1">LinkedIn Followers</p>
          <p className="text-2xl font-bold text-brand-text">{stats?.linkedinFollowers || 0}</p>
          <p className="text-xs text-brand-muted mt-1">Manual update</p>
        </div>
        <div className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-xl p-4">
          <p className="text-brand-muted text-sm mb-1">Instagram Followers</p>
          <p className="text-2xl font-bold text-brand-text">{stats?.instagramFollowers || 0}</p>
          <p className="text-xs text-brand-muted mt-1">Manual update</p>
        </div>
      </div>

      {/* Update Form */}
      <div className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-brand-text mb-6">Update Statistics</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {statsInfo.map((stat) => (
            <div key={stat.name} className="space-y-2">
              <label htmlFor={stat.name} className="flex items-center gap-2 text-brand-text font-medium">
                <span className="text-2xl">{stat.icon}</span>
                {stat.label}
              </label>
              <p className="text-sm text-brand-muted mb-2">{stat.description}</p>
              <input
                type="number"
                id={stat.name}
                name={stat.name}
                value={formData[stat.name]}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                placeholder="Enter number"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-brand-bg font-bold text-lg hover:shadow-lg hover:shadow-brand-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Update Stats'}
          </button>
        </form>
      </div>

      {/* Help Text */}
      <div className="bg-brand-bg/50 border border-brand-primary/10 rounded-xl p-4">
        <h4 className="text-brand-text font-medium mb-2">💡 Quick Tips</h4>
        <ul className="text-sm text-brand-muted space-y-1">
          <li>• <strong>Unique Visitors</strong> and <strong>Total Page Views</strong> are automatically tracked</li>
          <li>• Update <strong>LinkedIn stats</strong> manually from your LinkedIn analytics dashboard</li>
          <li>• Update <strong>Instagram followers</strong> manually from your Instagram insights</li>
          <li>• <strong>Product Interest</strong> can be from surveys, demos, or contact form submissions</li>
          <li>• Use <strong>Sync Count</strong> button to recalculate waitlist count after manual deletions</li>
          <li>• Changes appear on the website immediately after updating</li>
          <li>• For automatic updates, configure the API service in <code>src/services/socialMediaApi.js</code></li>
        </ul>
      </div>
    </div>
  );
};

export default StatsManager;
