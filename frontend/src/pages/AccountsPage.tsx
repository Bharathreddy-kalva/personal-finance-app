import { motion } from 'framer-motion';
import { Plus, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AccountCard from '@/components/shared/AccountCard';
import EmptyState from '@/components/shared/EmptyState';
import { AccountCardSkeleton } from '@/components/shared/Skeletons';
import { containerVariants, itemVariants } from '@/lib/animations';
import { useLoadingSimulation } from '@/hooks/useLoadingSimulation';
import { bankAccounts } from '@/data/mockData';

export default function AccountsPage() {
  const { data, isLoading } = useLoadingSimulation(bankAccounts, 600);
  const items = data ?? [];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Accounts</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Manage your linked bank accounts.</p>
        </div>
        <Button className="active:scale-[0.98] transition-transform rounded-xl h-10 px-5 w-fit">
          <Plus className="w-4 h-4 mr-1.5" /> Connect Account
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AccountCardSkeleton count={3} />
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((acc) => (
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
