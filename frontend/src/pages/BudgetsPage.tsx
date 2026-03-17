import { motion } from 'framer-motion';
import { Plus, DollarSign, TrendingDown, AlertTriangle, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/shared/StatCard';
import BudgetCard from '@/components/shared/BudgetCard';
import EmptyState from '@/components/shared/EmptyState';
import { StatCardSkeleton, BudgetCardSkeleton } from '@/components/shared/Skeletons';
import { containerVariants, itemVariants } from '@/lib/animations';
import { useLoadingSimulation } from '@/hooks/useLoadingSimulation';
import { budgets } from '@/data/mockData';

export default function BudgetsPage() {
  const { data, isLoading } = useLoadingSimulation(budgets, 600);
  const items = data ?? [];
  const totalLimit = items.reduce((s, b) => s + b.limit, 0);
  const totalSpent = items.reduce((s, b) => s + b.spent, 0);
  const overBudget = items.filter((b) => b.spent > b.limit).length;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Budgets</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Track your spending against monthly limits.</p>
        </div>
        <Button className="active:scale-[0.98] transition-transform rounded-xl h-10 px-5 w-fit">
          <Plus className="w-4 h-4 mr-1.5" /> New Budget
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isLoading ? (
          <StatCardSkeleton count={3} />
        ) : (
          <>
            <StatCard label="Total Budget" value={`$${totalLimit.toLocaleString()}`} icon={DollarSign} index={0} />
            <StatCard label="Total Spent" value={`$${totalSpent.toLocaleString()}`} trend={`${Math.round((totalSpent / totalLimit) * 100)}%`} trendType={totalSpent > totalLimit ? 'down' : 'up'} icon={TrendingDown} index={1} />
            <StatCard label="Over Budget" value={`${overBudget} ${overBudget === 1 ? 'category' : 'categories'}`} trendType="down" icon={AlertTriangle} index={2} />
          </>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <BudgetCardSkeleton count={8} />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={PiggyBank}
          title="No budgets set"
          description="Create monthly budgets to track your spending by category and stay on top of your finances."
          actionLabel="New Budget"
          actionIcon={Plus}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((b) => (
            <BudgetCard key={b.id} budget={b} variants={itemVariants} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
