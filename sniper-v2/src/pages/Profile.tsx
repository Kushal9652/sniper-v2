import React, { useEffect, useState } from 'react';
import {
  User, Mail, Shield, Calendar, Clock, Activity, Edit3, Trash2, X, Save,
  LogOut, MapPin, Building2, Globe, Phone, FileText, Bell, Newspaper,
  Lock, Target, AlertTriangle, Check
} from 'lucide-react';

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  role: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  fullName?: string;
  bio?: string;
  company?: string;
  location?: string;
  website?: string;
  phone?: string;
  avatar?: string;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    twoFactorEnabled: boolean;
  };
  stats?: {
    totalScans: number;
    vulnerabilitiesFound: number;
    lastScanDate?: string;
  };
}

const dummyProfile: UserProfile = {
  _id: 'dummyid',
  username: 'demo_user',
  email: 'demo@example.com',
  role: 'user',
  isActive: true,
  lastLogin: new Date().toISOString(),
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  fullName: 'Demo User',
  bio: 'Security researcher and ethical hacker',
  company: 'Security Labs Inc.',
  location: 'San Francisco, CA',
  website: 'https://example.com',
  phone: '+1 (555) 123-4567',
  preferences: {
    notifications: true,
    newsletter: false,
    twoFactorEnabled: false,
  },
  stats: {
    totalScans: 42,
    vulnerabilitiesFound: 156,
    lastScanDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

function getInitials(name: string) {
  return name
    .split(/[_\s]+/)
    .map((n) => n[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);
}

function formatDate(dateString: string | undefined) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatTimeAgo(dateString: string | undefined) {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(dateString);
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile');
  const [form, setForm] = useState({
    username: '',
    email: '',
    fullName: '',
    bio: '',
    company: '',
    location: '',
    website: '',
    phone: '',
  });
  const [preferences, setPreferences] = useState({
    notifications: true,
    newsletter: false,
    twoFactorEnabled: false,
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      if (!token) {
        setProfile(dummyProfile);
        setForm({
          username: dummyProfile.username,
          email: dummyProfile.email,
          fullName: dummyProfile.fullName || '',
          bio: dummyProfile.bio || '',
          company: dummyProfile.company || '',
          location: dummyProfile.location || '',
          website: dummyProfile.website || '',
          phone: dummyProfile.phone || '',
        });
        setPreferences(dummyProfile.preferences || { notifications: true, newsletter: false, twoFactorEnabled: false });
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data.data);
        setForm({
          username: data.data.username || '',
          email: data.data.email || '',
          fullName: data.data.fullName || '',
          bio: data.data.bio || '',
          company: data.data.company || '',
          location: data.data.location || '',
          website: data.data.website || '',
          phone: data.data.phone || '',
        });
        setPreferences(data.data.preferences || { notifications: true, newsletter: false, twoFactorEnabled: false });
      } catch (err: any) {
        setError(err.message || 'Error loading profile');
        setProfile(dummyProfile);
        setForm({
          username: dummyProfile.username,
          email: dummyProfile.email,
          fullName: dummyProfile.fullName || '',
          bio: dummyProfile.bio || '',
          company: dummyProfile.company || '',
          location: dummyProfile.location || '',
          website: dummyProfile.website || '',
          phone: dummyProfile.phone || '',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!token) {
      setError('You must be logged in to update your profile.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, preferences }),
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
    } finally {
      setSaving(false);
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
      const res = await fetch('/api/users/profile', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete account');
      }
      setSuccess('Account deleted.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err: any) {
      setError(err.message || 'Error deleting account');
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="text-center text-zinc-400">
          <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-zinc-400">Manage your profile information and preferences</p>
        </div>

        {/* Alerts */}
        {success && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center gap-2">
            <Check className="w-4 h-4" />
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden sticky top-24">
              {/* Cover gradient */}
              <div className="h-24 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 relative">
                <div className="absolute inset-0 cyber-grid opacity-20"></div>
              </div>

              {/* Avatar */}
              <div className="relative px-6 -mt-12">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border-4 border-zinc-900 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                    {getInitials(profile.fullName || profile.username)}
                  </div>
                  <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-zinc-900 ${profile.isActive !== false ? 'bg-green-500' : 'bg-zinc-500'}`}></div>
                </div>
              </div>

              {/* User Info */}
              <div className="px-6 pt-3 pb-6">
                <h2 className="text-xl font-bold text-white">{profile.fullName || profile.username}</h2>
                <p className="text-zinc-400 text-sm mb-1">@{profile.username}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${profile.role === 'admin'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-zinc-700 text-zinc-300'
                    }`}>
                    <Shield className="w-3 h-3" />
                    {profile.role.toUpperCase()}
                  </span>
                  {profile.isActive !== false && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400">Active</span>
                  )}
                </div>

                {profile.bio && (
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{profile.bio}</p>
                )}

                <div className="space-y-2 text-sm">
                  {profile.email && (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Mail className="w-4 h-4 text-zinc-500" />
                      <span className="truncate">{profile.email}</span>
                    </div>
                  )}
                  {profile.company && (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Building2 className="w-4 h-4 text-zinc-500" />
                      <span>{profile.company}</span>
                    </div>
                  )}
                  {profile.location && (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <MapPin className="w-4 h-4 text-zinc-500" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Globe className="w-4 h-4 text-zinc-500" />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline truncate">
                        {profile.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-zinc-800">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{profile.stats?.totalScans || 0}</div>
                    <div className="text-xs text-zinc-500 uppercase">Total Scans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{profile.stats?.vulnerabilitiesFound || 0}</div>
                    <div className="text-xs text-zinc-500 uppercase">Vulns Found</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-zinc-800 space-y-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-zinc-900/50 rounded-lg border border-zinc-800">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'preferences', label: 'Preferences', icon: Bell },
                { id: 'security', label: 'Security', icon: Lock },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                      ? 'bg-red-500 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                    <p className="text-sm text-zinc-400">Update your personal details</p>
                  </div>
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                </div>

                {editMode ? (
                  <form onSubmit={handleUpdate} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Username</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1.5">Bio</label>
                      <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Company</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Acme Inc."
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="San Francisco, CA"
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Website</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="url"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(false);
                          setForm({
                            username: profile.username,
                            email: profile.email,
                            fullName: profile.fullName || '',
                            bio: profile.bio || '',
                            company: profile.company || '',
                            location: profile.location || '',
                            website: profile.website || '',
                            phone: profile.phone || '',
                          });
                          setError(null);
                        }}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-all"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InfoItem icon={User} label="Username" value={profile.username} />
                      <InfoItem icon={Mail} label="Email" value={profile.email} />
                      <InfoItem icon={FileText} label="Full Name" value={profile.fullName || 'Not set'} />
                      <InfoItem icon={Building2} label="Company" value={profile.company || 'Not set'} />
                      <InfoItem icon={MapPin} label="Location" value={profile.location || 'Not set'} />
                      <InfoItem icon={Globe} label="Website" value={profile.website || 'Not set'} isLink={!!profile.website} />
                      <InfoItem icon={Phone} label="Phone" value={profile.phone || 'Not set'} />
                      <InfoItem icon={Calendar} label="Member Since" value={formatDate(profile.createdAt)} />
                    </div>
                    {profile.bio && (
                      <div>
                        <label className="text-xs uppercase tracking-wide text-zinc-500 mb-1.5 block">Bio</label>
                        <p className="text-zinc-300">{profile.bio}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  <PreferenceToggle
                    icon={Bell}
                    title="Push Notifications"
                    description="Receive notifications about scan completions and security alerts"
                    enabled={preferences.notifications}
                    onToggle={() => handlePreferenceChange('notifications')}
                  />
                  <PreferenceToggle
                    icon={Newspaper}
                    title="Newsletter"
                    description="Stay updated with the latest security news and tips"
                    enabled={preferences.newsletter}
                    onToggle={() => handlePreferenceChange('newsletter')}
                  />
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
                  <div className="space-y-4">
                    <PreferenceToggle
                      icon={Lock}
                      title="Two-Factor Authentication"
                      description="Add an extra layer of security to your account"
                      enabled={preferences.twoFactorEnabled}
                      onToggle={() => handlePreferenceChange('twoFactorEnabled')}
                    />
                  </div>
                </div>

                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Session Information</h3>
                  <p className="text-sm text-zinc-400 mb-4">Your current login session details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-zinc-400 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wide">Last Login</span>
                      </div>
                      <p className="text-white font-medium">{formatTimeAgo(profile.lastLogin)}</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-zinc-400 mb-1">
                        <Activity className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wide">Last Updated</span>
                      </div>
                      <p className="text-white font-medium">{formatTimeAgo(profile.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-red-900/30 p-6">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
                  <p className="text-sm text-zinc-400 mb-4">Irreversible and destructive actions</p>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deleting ? 'Deleting...' : 'Delete Account'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Demo notice */}
        {!token && (
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">
              You are viewing a demo profile. <a href="/login" className="text-red-400 hover:text-red-300 underline">Login</a> to see your actual profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// InfoItem component for displaying profile fields
const InfoItem: React.FC<{ icon: any; label: string; value: string; isLink?: boolean }> = ({
  icon: Icon, label, value, isLink
}) => (
  <div>
    <label className="text-xs uppercase tracking-wide text-zinc-500 mb-1.5 flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </label>
    {isLink ? (
      <a href={value} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
        {value.replace(/^https?:\/\//, '')}
      </a>
    ) : (
      <p className={`font-medium ${value === 'Not set' ? 'text-zinc-500 italic' : 'text-white'}`}>{value}</p>
    )}
  </div>
);

// PreferenceToggle component
const PreferenceToggle: React.FC<{
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}> = ({ icon: Icon, title, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-zinc-800">
        <Icon className="w-5 h-5 text-zinc-400" />
      </div>
      <div>
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
    </div>
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-red-500' : 'bg-zinc-700'
        }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
      />
    </button>
  </div>
);

export default Profile;
