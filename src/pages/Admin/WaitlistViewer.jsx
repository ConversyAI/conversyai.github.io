import { useState } from 'react';
import { motion } from 'framer-motion';
import { deleteFromWaitlist, bulkDeleteFromWaitlist } from '../../firebase';
import toast from 'react-hot-toast';

const WaitlistViewer = ({ waitlist, onUpdate }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async (id, email) => {
    if (!confirm(`Are you sure you want to delete ${email} from the waitlist?`)) return;

    setIsDeleting(true);
    const result = await deleteFromWaitlist(id);

    if (result.success) {
      toast.success(`Deleted! Waitlist count: ${result.newCount}`);
      onUpdate(); // Refresh the list
    } else {
      toast.error('Failed to delete entry');
    }
    setIsDeleting(false);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error('No items selected');
      return;
    }

    if (!confirm(`Delete ${selectedIds.length} selected entries?`)) return;

    setIsDeleting(true);
    const result = await bulkDeleteFromWaitlist(selectedIds);

    if (result.success) {
      toast.success(`Deleted ${result.deleted} entries! New count: ${result.newCount}`);
      setSelectedIds([]);
      onUpdate();
    } else {
      toast.error('Failed to delete entries');
    }
    setIsDeleting(false);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === waitlist.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(waitlist.map(entry => entry.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Date', 'Status'];
    const rows = waitlist.map(entry => [
      entry.name,
      entry.email,
      new Date(entry.timestamp?.seconds * 1000).toLocaleString(),
      entry.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-text mb-2">Waitlist</h2>
          <p className="text-brand-muted">{waitlist.length} people on the waitlist</p>
        </div>
        {waitlist.length > 0 && (
          <div className="flex gap-3">
            {selectedIds.length > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={isDeleting}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-full text-white font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50"
              >
                🗑️ Delete {selectedIds.length} Selected
              </button>
            )}
            <button
              onClick={exportToCSV}
              className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-brand-bg font-bold hover:shadow-lg hover:shadow-brand-primary/50 transition-all"
            >
              📥 Export to CSV
            </button>
          </div>
        )}
      </div>

      {waitlist.length === 0 ? (
        <div className="text-center py-12 bg-brand-panel/30 rounded-xl">
          <p className="text-brand-muted">No waitlist entries yet</p>
        </div>
      ) : (
        <div className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-brand-bg/50">
                <tr>
                  <th className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === waitlist.length && waitlist.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-brand-text font-medium">Name</th>
                  <th className="px-6 py-4 text-left text-brand-text font-medium">Email</th>
                  <th className="px-6 py-4 text-left text-brand-text font-medium">Date</th>
                  <th className="px-6 py-4 text-left text-brand-text font-medium">Status</th>
                  <th className="px-6 py-4 text-center text-brand-text font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-primary/10">
                {waitlist.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`hover:bg-brand-bg/30 transition-colors ${
                      selectedIds.includes(entry.id) ? 'bg-brand-primary/10' : ''
                    }`}
                  >
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(entry.id)}
                        onChange={() => toggleSelect(entry.id)}
                        className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary"
                      />
                    </td>
                    <td className="px-6 py-4 text-brand-text">{entry.name}</td>
                    <td className="px-6 py-4 text-brand-muted">{entry.email}</td>
                    <td className="px-6 py-4 text-brand-muted text-sm">
                      {entry.timestamp?.seconds
                        ? new Date(entry.timestamp.seconds * 1000).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        entry.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(entry.id, entry.email)}
                        disabled={isDeleting}
                        className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                        title="Delete this entry"
                      >
                        🗑️
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitlistViewer;
