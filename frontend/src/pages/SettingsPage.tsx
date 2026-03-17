import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getProfile } from '@/services/authService';

const tabs = ['Profile', 'Security', 'Notifications', 'Accounts', 'Privacy'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const email = parsedUser?.email;

        if (!email) {
          setLoading(false);
          return;
        }

        const data = await getProfile(email);

        const fullNameParts = data.fullName?.trim().split(' ') || [];
        const firstName = fullNameParts[0] || '';
        const lastName = fullNameParts.slice(1).join(' ') || '';

        setProfile({
          firstName,
          lastName,
          email: data.email || '',
          phone: '',
        });
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const initials = useMemo(() => {
    const first = profile.firstName?.[0] || '';
    const last = profile.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase() || 'U';
  }, [profile.firstName, profile.lastName]);

  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Manage your account preferences.</p>
      </div>

      <div className="flex gap-1 bg-secondary/60 border border-border/50 rounded-xl p-1 w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === tab
                ? 'bg-card text-foreground shadow-card'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-card border border-border rounded-2xl shadow-card"
      >
        {activeTab === 'Profile' && (
          <div className="p-6 sm:p-8 space-y-8">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading profile...</p>
            ) : (
              <>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary ring-4 ring-primary/5">
                    {initials}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground tracking-tight">
                      {fullName || 'User'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {profile.email || 'No email available'}
                    </p>
                    <button className="text-[12px] text-primary font-semibold mt-1 hover:underline">
                      Change photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      First Name
                    </label>
                    <input
                      value={profile.firstName}
                      readOnly
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Last Name
                    </label>
                    <input
                      value={profile.lastName}
                      readOnly
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Email
                    </label>
                    <input
                      value={profile.email}
                      readOnly
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Phone
                    </label>
                    <input
                      value={profile.phone}
                      readOnly
                      placeholder="Not added yet"
                      className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none"
                    />
                  </div>
                </div>

                <Button
                  disabled
                  className="active:scale-[0.98] transition-transform rounded-xl h-10 px-6"
                >
                  Save Changes
                </Button>
              </>
            )}
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="p-6 sm:p-8 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-foreground mb-1">Change Password</h3>
              <p className="text-[12px] text-muted-foreground mb-5">
                Update your password to keep your account secure.
              </p>
              <div className="space-y-3 max-w-sm">
                <input
                  placeholder="Current password"
                  type="password"
                  className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/30 transition-all"
                />
                <input
                  placeholder="New password"
                  type="password"
                  className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/30 transition-all"
                />
                <Button className="rounded-xl h-10">Update Password</Button>
              </div>
            </div>
            <div className="border-t border-border pt-8">
              <h3 className="text-sm font-bold text-foreground mb-1">Two-Factor Authentication</h3>
              <p className="text-[12px] text-muted-foreground mb-4">
                Add an extra layer of security to your account.
              </p>
              <Button variant="outline" className="rounded-xl h-10">
                Enable 2FA
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="p-6 sm:p-8 space-y-1">
            {['Email notifications', 'Push notifications', 'Weekly summary', 'Budget alerts', 'Transaction alerts'].map((pref) => (
              <div key={pref} className="flex items-center justify-between py-4 border-b border-border/50 last:border-0">
                <div>
                  <span className="text-sm font-medium text-foreground">{pref}</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Receive notifications about {pref.toLowerCase()}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-10 h-[22px] bg-secondary rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-card after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm peer-checked:after:translate-x-[18px]" />
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Accounts' && (
          <div className="p-6 sm:p-8">
            <p className="text-sm text-muted-foreground">
              Manage connected bank accounts from the{' '}
              <a href="/accounts" className="text-primary font-semibold hover:underline">
                Accounts page
              </a>.
            </p>
          </div>
        )}

        {activeTab === 'Privacy' && (
          <div className="p-6 sm:p-8 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-foreground mb-1">Data Export</h3>
              <p className="text-[12px] text-muted-foreground mb-4">
                Download a copy of your financial data.
              </p>
              <Button variant="outline" className="rounded-xl h-10">
                Export Data
              </Button>
            </div>
            <div className="border-t border-border pt-8">
              <h3 className="text-sm font-bold text-destructive mb-1">Delete Account</h3>
              <p className="text-[12px] text-muted-foreground mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" className="rounded-xl h-10">
                Delete Account
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}