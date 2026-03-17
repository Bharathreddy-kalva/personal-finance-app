import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  TrendingDown,
  AlertTriangle,
  Wallet,
  Plus,
  ArrowUpRight,
} from 'lucide-react';
import StatCard from '@/components/shared/StatCard';
import ChartCard from '@/components/shared/ChartCard';
import SpendingTrendChart from '@/components/charts/SpendingTrendChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import TransactionRow from '@/components/shared/TransactionRow';
import {
  StatCardSkeleton,
  ChartCardSkeleton,
  TransactionRowSkeleton,
} from '@/components/shared/Skeletons';
import { Button } from '@/components/ui/button';
import { containerVariants, itemVariants } from '@/lib/animations';
import { getDashboardSummary, type DashboardSummaryResponse } from '@/services/dashboardService';
import {
  transactions,
  bankAccounts,
  budgets,
  monthlySpending,
  categoryBreakdown,
} from '@/data/mockData';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
          setIsLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const email = parsedUser?.email;
        const fullName = parsedUser?.fullName || 'User';

        setUserName(fullName.split(' ')[0] || 'User');

        if (!email) {
          setIsLoading(false);
          return;
        }

        const data = await getDashboardSummary(email);
        setSummary(data);
      } catch (error) {
        console.error('Failed to load dashboard summary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 max-w-7xl">
      {/* Greeting */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Good morning, {userName}
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Here&apos;s your financial overview.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <StatCardSkeleton count={4} />
        ) : (
          <>
            <StatCard
              label="Total Budget"
              value={`$${(summary?.totalBudget ?? 0).toLocaleString()}`}
              trend="From budgets"
              trendType="up"
              icon={DollarSign}
              index={0}
              accent
            />
            <StatCard
              label="Total Spent"
              value={`$${(summary?.totalSpent ?? 0).toLocaleString()}`}
              trend={
                (summary?.totalBudget ?? 0) > 0
                  ? `${Math.round(((summary?.totalSpent ?? 0) / (summary?.totalBudget ?? 1)) * 100)}% used`
                  : '0% used'
              }
              trendType={(summary?.totalSpent ?? 0) > (summary?.totalBudget ?? 0) ? 'down' : 'up'}
              icon={TrendingDown}
              index={1}
            />
            <StatCard
              label="Over Budget"
              value={`${summary?.overBudgetCount ?? 0}`}
              trend="Categories exceeded"
              trendType="down"
              icon={AlertTriangle}
              index={2}
            />
            <StatCard
              label="Budget Categories"
              value={`${summary?.budgetCount ?? 0}`}
              trend="Active budgets"
              trendType="up"
              icon={Wallet}
              index={3}
            />
          </>
        )}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {isLoading ? (
          <>
            <ChartCardSkeleton className="lg:col-span-3" />
            <ChartCardSkeleton className="lg:col-span-2" />
          </>
        ) : (
          <>
            <ChartCard
              title="Spending Trend"
              subtitle="Income vs expenses · last 6 months"
              className="lg:col-span-3"
              variants={itemVariants}
              headerRight={
                <div className="flex items-center gap-4 text-[11px] font-medium">
                  <span className="flex items-center gap-1.5 text-success">
                    <span className="w-2 h-2 rounded-full bg-success" /> Income
                  </span>
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary" /> Expenses
                  </span>
                </div>
              }
            >
              <SpendingTrendChart data={monthlySpending} />
            </ChartCard>

            <ChartCard
              title="Spending by Category"
              subtitle="This month's breakdown"
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <CategoryPieChart data={categoryBreakdown} />
            </ChartCard>
          </>
        )}
      </div>

      {/* Accounts + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bank accounts */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="px-6 py-5 flex justify-between items-center">
            <h3 className="font-semibold text-foreground tracking-tight">Accounts</h3>
            <Button variant="ghost" size="sm" className="text-[11px] text-primary hover:text-primary font-semibold h-8 px-2.5 rounded-lg">
              <Plus className="w-3.5 h-3.5 mr-1" /> Connect
            </Button>
          </div>
          {isLoading ? (
            <div className="divide-y divide-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary" />
                    <div>
                      <div className="h-4 w-24 bg-secondary rounded" />
                      <div className="h-3 w-16 bg-secondary rounded mt-1" />
                    </div>
                  </div>
                  <div className="h-4 w-16 bg-secondary rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {bankAccounts.slice(0, 3).map((acc) => (
                <div key={acc.id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/40 transition-colors duration-200 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg flex-shrink-0">
                      {acc.logo}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{acc.name}</p>
                      <p className="text-[11px] text-muted-foreground">{acc.institution}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-semibold tabular-nums ${acc.balance < 0 ? 'text-destructive' : 'text-foreground'}`}>
                      {acc.balance < 0 ? '-' : ''}${Math.abs(acc.balance).toLocaleString()}
                    </span>
                    <p className="text-[10px] text-muted-foreground">{acc.lastSynced}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent transactions */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="px-6 py-5 flex justify-between items-center">
            <h3 className="font-semibold text-foreground tracking-tight">Recent Transactions</h3>
            <Button variant="ghost" size="sm" className="text-[11px] text-primary hover:text-primary font-semibold h-8 px-2.5 rounded-lg gap-1" asChild>
              <Link to="/transactions">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="divide-y divide-border">
              <TransactionRowSkeleton count={6} />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {transactions.slice(0, 6).map((tx, i) => (
                <TransactionRow key={tx.id} transaction={tx} index={i} compact />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Budget progress + Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="px-6 py-5 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-foreground tracking-tight">Budget Progress</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Current month</p>
            </div>
            <Button variant="ghost" size="sm" className="text-[11px] text-primary hover:text-primary font-semibold h-8 px-2.5 rounded-lg gap-1" asChild>
              <Link to="/budgets">
                Manage <ArrowUpRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>
          <div className="px-6 pb-6 space-y-5">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex justify-between mb-2">
                      <div className="h-4 w-24 bg-secondary rounded" />
                      <div className="h-3 w-16 bg-secondary rounded" />
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full" />
                  </div>
                ))
              : budgets.slice(0, 4).map((b) => {
                  const pct = Math.min((b.spent / b.limit) * 100, 100);
                  const over = b.spent > b.limit;
                  return (
                    <div key={b.id}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium flex items-center gap-2">
                          <span className="text-base">{b.icon}</span> {b.category}
                        </span>
                        <span className="text-muted-foreground tabular-nums text-[12px]">
                          ${b.spent} <span className="text-muted-foreground/50">/ ${b.limit}</span>
                        </span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                          className={`h-full rounded-full ${over ? 'bg-destructive' : pct > 75 ? 'bg-warning' : 'bg-primary'}`}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="px-6 py-5">
            <h3 className="font-semibold text-foreground tracking-tight">Quick Insights</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Budget-based overview</p>
          </div>
          <div className="px-6 pb-6 space-y-0 divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="py-4 flex justify-between items-center animate-pulse">
                  <div>
                    <div className="h-3 w-32 bg-secondary rounded" />
                    <div className="h-4 w-16 bg-secondary rounded mt-1.5" />
                  </div>
                  <div className="h-3 w-20 bg-secondary rounded" />
                </div>
              ))
            ) : (
              [
                {
                  label: 'Total Budget',
                  value: `$${(summary?.totalBudget ?? 0).toLocaleString()}`,
                  sub: 'Across all categories',
                  color: 'text-primary',
                },
                {
                  label: 'Total Spent',
                  value: `$${(summary?.totalSpent ?? 0).toLocaleString()}`,
                  sub: 'Current budget usage',
                  color: 'text-chart-4',
                },
                {
                  label: 'Over Budget',
                  value: `${summary?.overBudgetCount ?? 0}`,
                  sub: 'Categories exceeded',
                  color: 'text-destructive',
                },
                {
                  label: 'Budget Categories',
                  value: `${summary?.budgetCount ?? 0}`,
                  sub: 'Active categories',
                  color: 'text-success',
                },
              ].map((insight) => (
                <div key={insight.label} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                      {insight.label}
                    </p>
                    <p className={`text-sm font-bold mt-0.5 ${insight.color}`}>{insight.value}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground text-right">{insight.sub}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}