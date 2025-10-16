import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addInterview, updateInterview, deleteInterview } from '../../firebase';
import toast from 'react-hot-toast';

const TestimonialsManager = ({ testimonials, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image: '',
  });

  const resetForm = () => {
    setFormData({ name: '', role: '', content: '', rating: 5, image: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = editingId
      ? await updateInterview(editingId, formData)
      : await addInterview(formData);

    if (result.success) {
      toast.success(editingId ? 'Testimonial updated!' : 'Testimonial added!');
      resetForm();
      onUpdate();
    } else {
      toast.error('Failed to save testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    const result = await deleteInterview(id);
    if (result.success) {
      toast.success('Testimonial deleted');
      onUpdate();
    } else {
      toast.error('Failed to delete testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating || 5,
      image: testimonial.image || '',
    });
    setEditingId(testimonial.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-text mb-2">Testimonials</h2>
          <p className="text-brand-muted">Manage user interviews and testimonials</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-brand-bg font-bold hover:shadow-lg hover:shadow-brand-primary/50 transition-all"
        >
          {isAdding ? 'Cancel' : '+ Add Testimonial'}
        </button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-brand-text mb-4">
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-text font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text focus:outline-none focus:border-brand-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-brand-text font-medium mb-2">Role *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text focus:outline-none focus:border-brand-primary"
                    placeholder="CEO, Company Name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-brand-text font-medium mb-2">Testimonial *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text focus:outline-none focus:border-brand-primary"
                  placeholder="Great product! It helped us..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-text font-medium mb-2">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text focus:outline-none focus:border-brand-primary"
                  >
                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-brand-text font-medium mb-2">Image URL (optional)</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text focus:outline-none focus:border-brand-primary"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-brand-bg font-bold">
                  {editingId ? 'Update' : 'Add'} Testimonial
                </button>
                <button type="button" onClick={resetForm} className="px-6 py-3 bg-brand-bg border border-brand-primary/30 rounded-full text-brand-text">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 gap-4">
        {testimonials.length === 0 ? (
          <div className="text-center py-12 bg-brand-panel/30 rounded-xl">
            <p className="text-brand-muted">No testimonials yet. Add your first one!</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-brand-panel/50 backdrop-blur-sm border border-brand-primary/20 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  {testimonial.image && (
                    <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full" />
                  )}
                  <div className="flex-1">
                    <h4 className="text-brand-text font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-brand-primary text-sm mb-2">{testimonial.role}</p>
                    <p className="text-brand-muted text-sm mb-2">{testimonial.content}</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(testimonial)} className="px-4 py-2 bg-brand-bg border border-brand-primary/30 rounded-lg text-brand-text hover:border-brand-primary text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(testimonial.id)} className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialsManager;
