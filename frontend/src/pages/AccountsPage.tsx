import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AccountCard from '@/components/shared/AccountCard';
import EmptyState from '@/components/shared/EmptyState';
import { AccountCardSkeleton } from '@/components/shared/Skeletons';
import { containerVariants, itemVariants } from '@/lib/animations';
import { getAccounts, type BankAccountResponse } from '@/services/financeDataService';
import { createLinkToken, exchangePublicToken } from '@/services/plaidService';
import { usePlaidLink } from 'react-plaid-link';

export default function AccountsPage() {
  const [items, setItems] = useState<BankAccountResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [linkToken, setLinkToken] = useState<string | null>(null);

  const loadAccounts = async () => {
    try {
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        setItems([]);
        setIsLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const email = parsedUser?.email;

      if (!email) {
        setItems([]);
        setIsLoading(false);
        return;
      }

      const data = await getAccounts(email);
      setItems(data);
    } catch (error) {
      console.error('Failed to load accounts:', error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleCreateLinkToken = async () => {
    try {
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        alert('Please login first');
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const userId = String(parsedUser?.userId || '1');

      const response = await createLinkToken(userId);
      setLinkToken(response.link_token);
    } catch (error) {
      console.error('Failed to create link token:', error);
      alert('Failed to initialize Plaid');
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token) => {
      try {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const email = parsedUser?.email;

        if (!email) {
          alert('User email not found');
          return;
        }

        const result = await exchangePublicToken(public_token, email);
        console.log('Plaid exchange success:', result);
        alert('Bank linked successfully');
        await loadAccounts();
      } catch (error) {
        console.error('Failed to exchange public token:', error);
        alert('Failed to link bank account');
      }
    },
    onExit: (err) => {
      if (err) {
        console.error('Plaid Link exit error:', err);
      }
    },
  });

  useEffect(() => {
    if (linkToken && ready) {
      open();
    }
  }, [linkToken, ready, open]);

  const mappedAccounts = items.map((acc) => ({
    id: acc.id,
    name: acc.accountName,
    institution: acc.institutionName,
    balance: acc.currentBalance,
    availableBalance: acc.availableBalance,
    type: acc.type,
    logo: '🏦',
    lastSynced: 'Just now',
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-5xl"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Accounts
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Manage your linked bank accounts.
          </p>
        </div>

        <Button
          onClick={handleCreateLinkToken}
          className="active:scale-[0.98] transition-transform rounded-xl h-10 px-5 w-fit"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Connect Account
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AccountCardSkeleton count={3} />
        </div>
      ) : mappedAccounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mappedAccounts.map((acc) => (
            <AccountCard key={acc.id} account={acc} variants={itemVariants} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Building2}
          title="No accounts linked"
          description="Connect your bank accounts to start tracking balances and transactions automatically."
          actionLabel="Connect Account"
          actionIcon={Plus}
        />
      )}
    </motion.div>
  );
}