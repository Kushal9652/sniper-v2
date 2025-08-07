
import React, { useEffect, useState } from 'react';

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  role: string;
  lastLogin?: string;
}

const dummyProfile: UserProfile = {
  _id: 'dummyid',
  username: 'demo_user',
  email: 'demo@example.com',
  role: 'user',
  lastLogin: new Date().toISOString(),
};

function getInitials(name: string) {
  return name
    .split(/[_\s]+/)
    .map((n) => n[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: '', email: '' });
  const [success, setSuccess] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Replace with your auth token logic
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      if (!token) {
        setProfile(dummyProfile);
        setForm({ username: dummyProfile.username, email: dummyProfile.email });
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('http://localhost:5001/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data.data);
        setForm({ username: data.data.username, email: data.data.email });
      } catch (err: any) {
        setError(err.message || 'Error loading profile');
        setProfile(dummyProfile);
        setForm({ username: dummyProfile.username, email: dummyProfile.email });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!token) {
      setError('You must be logged in to update your profile.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5001/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update profile');
      }
      const data = await res.json();
      setProfile(data.data);
      setSuccess('Profile updated successfully!');
      setEditMode(false);
    } catch (err: any) {
      setError(err.message || 'Error updating profile');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    setDeleting(true);
    setError(null);
    setSuccess(null);
    if (!token) {
      setError('You must be logged in to delete your account.');
      setDeleting(false);
      return;
    }
    try {
      const res = await fetch('http://localhost:5001/api/users/profile', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete account');
      }
      setSuccess('Account deleted.');
      // Optionally, log out user or redirect
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err: any) {
      setError(err.message || 'Error deleting account');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (!profile) return <div className="p-8 text-center">No profile data.</div>;

  return (
    <div className="flex justify-center items-start min-h-[60vh] bg-zinc-900 pt-16 pb-12">
      <div className="w-full max-w-lg p-8 mt-8 rounded-2xl shadow-xl bg-zinc-800 border border-zinc-700 relative">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center text-3xl font-bold text-white shadow mb-2">
            {getInitials(profile.username)}
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{profile.username}</h1>
          <span className="text-zinc-300 text-sm">{profile.email}</span>
          <span className="text-xs mt-1 px-2 py-0.5 rounded bg-zinc-700 text-zinc-200 font-medium">{profile.role.toUpperCase()}</span>
        </div>
        {success && <div className="mb-4 text-green-400 text-center">{success}</div>}
        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        {editMode ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-200">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border border-zinc-600 rounded px-3 py-2 bg-zinc-900 text-white focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-200">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-zinc-600 rounded px-3 py-2 bg-zinc-900 text-white focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
            </div>
            <div className="flex gap-2 justify-center">
              <button type="submit" className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition">Save</button>
              <button type="button" className="px-5 py-2 rounded-lg border font-semibold text-white border-zinc-600 hover:bg-zinc-700 transition" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-1">
              <span className="block text-xs text-zinc-400">Last Login</span>
              <span className="font-medium text-zinc-200">{profile.lastLogin ? new Date(profile.lastLogin).toLocaleString() : 'Never'}</span>
            </div>
            <div className="flex gap-2 mt-6 justify-center">
              <button className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition" onClick={() => setEditMode(true)}>Edit Profile</button>
              <button className="px-5 py-2 rounded-lg border border-red-500 text-red-400 font-semibold hover:bg-red-900/20 transition" onClick={handleDelete} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete Account'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
