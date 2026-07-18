import { useState, useEffect } from 'react';
import { supabase, TABLES } from '../../../services/supabase';
import Button from '../../../components/common/Button';
import { toast } from 'react-toastify';
import { Save } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    institution_name: '',
    iic_name: '',
    email: '',
    phone: '',
    address: '',
    tagline: '',
    about_short: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const { data } = await supabase.from(TABLES.SETTINGS).select('*').limit(1).single();
      if (data) setSettings(data);
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from(TABLES.SETTINGS).upsert(settings, { onConflict: 'id' });
    if (error) toast.error(error.message);
    else toast.success('Settings saved!');
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-dark">Website Settings</h1>
        <Button icon={Save} onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</Button>
      </div>
      <div className="space-y-6">
        <div className="admin-card p-6">
          <h2 className="text-lg font-bold text-dark mb-4">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Institution Name</label><input name="institution_name" value={settings.institution_name} onChange={handleChange} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">IIC Name</label><input name="iic_name" value={settings.iic_name} onChange={handleChange} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Tagline</label><input name="tagline" value={settings.tagline} onChange={handleChange} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">About (Short)</label><input name="about_short" value={settings.about_short} onChange={handleChange} className="w-full px-4 py-2.5 admin-input" /></div>
          </div>
        </div>
        <div className="admin-card p-6">
          <h2 className="text-lg font-bold text-dark mb-4">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Email</label><input name="email" type="email" value={settings.email} onChange={handleChange} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Phone</label><input name="phone" value={settings.phone} onChange={handleChange} className="w-full px-4 py-2.5 admin-input" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-admin-muted mb-1">Address</label><textarea name="address" value={settings.address} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 admin-input" /></div>
          </div>
        </div>
        <div className="admin-card p-6">
          <h2 className="text-lg font-bold text-dark mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Facebook URL</label><input name="facebook" value={settings.facebook} onChange={handleChange} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Twitter URL</label><input name="twitter" value={settings.twitter} onChange={handleChange} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">Instagram URL</label><input name="instagram" value={settings.instagram} onChange={handleChange} className="w-full px-4 py-2.5 admin-input" /></div>
            <div><label className="block text-sm font-medium text-admin-muted mb-1">LinkedIn URL</label><input name="linkedin" value={settings.linkedin} onChange={handleChange} className="w-full px-4 py-2.5 admin-input" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
