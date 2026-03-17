import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, DollarSign, TrendingDown, AlertTriangle, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/shared/StatCard';
import BudgetCard, { type BudgetCardItem } from '@/components/shared/BudgetCard';
import EmptyState from '@/components/shared/EmptyState';
import { StatCardSkeleton, BudgetCardSkeleton } from '@/components/shared/Skeletons';
import { containerVariants, itemVariants } from '@/lib/animations';
import {
  createBudget,
  deleteBudget,
  getBudgets,
  updateBudget,
  type BudgetApiResponse,
} from '@/services/budgetService';

export default function BudgetsPage() {
  const [items, setItems] = useState<BudgetApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBudgetId, setEditingBudgetId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    categoryName: '',
    monthlyLimit: '',
    spentAmount: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const resetForm = () => {
    setFormData({
      categoryName: '',
      monthlyLimit: '',
      spentAmount: '',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });
    setEditingBudgetId(null);
    setShowForm(false);
  };

  const loadBudgets = async () => {
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

      const budgets = await getBudgets(email);
      setItems(budgets);
    } catch (error) {
      console.error('Failed to load budgets:', error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const handleSaveBudget = async () => {
    try {
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        alert('Please login first');
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const email = parsedUser?.email;

      if (!email) {
        alert('User email not found');
        return;
      }

      if (!formData.categoryName || !formData.monthlyLimit) {
        alert('Please fill required fields');
        return;
      }

      const payload = {
        categoryName: formData.categoryName,
        monthlyLimit: Number(formData.monthlyLimit),
        spentAmount: Number(formData.spentAmount || 0),
        month: Number(formData.month),
        year: Number(formData.year),
        userEmail: email,
      };

      if (editingBudgetId) {
        await updateBudget(editingBudgetId, payload);
      } else {
        await createBudget(payload);
      }

      resetForm();
      await loadBudgets();
    } catch (error) {
      console.error('Failed to save budget:', error);
      alert('Failed to save budget');
    }
  };

  const handleDeleteBudget = async (id: number) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this budget?');
      if (!confirmed) return;

      await deleteBudget(id);
      await loadBudgets();
    } catch (error) {
      console.error('Failed to delete budget:', error);
      alert('Failed to delete budget');
    }
  };

  const handleEditBudget = (budget: BudgetCardItem) => {
    setEditingBudgetId(budget.id);
    setFormData({
      categoryName: budget.categoryName,
      monthlyLimit: String(budget.monthlyLimit),
      spentAmount: String(budget.spentAmount),
      month: budget.month,
      year: budget.year,
    });
    setShowForm(true);
  };

  const totalLimit = useMemo(
    () => items.reduce((sum, b) => sum + b.monthlyLimit, 0),
    [items]
  );

  const totalSpent = useMemo(
    () => items.reduce((sum, b) => sum + b.spentAmount, 0),
    [items]
  );

  const overBudget = useMemo(
    () => items.filter((b) => b.spentAmount > b.monthlyLimit).length,
    [items]
  );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Budgets</h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Track your spending against monthly limits.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingBudgetId(null);
            setShowForm(true);
          }}
          className="active:scale-[0.98] transition-transform rounded-xl h-10 px-5 w-fit"
        >
          <Plus className="w-4 h-4 mr-1.5" /> New Budget
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isLoading ? (
          <StatCardSkeleton count={3} />
        ) : (
          <>
            <StatCard
              label="Total Budget"
              value={`$${totalLimit.toLocaleString()}`}
              icon={DollarSign}
              index={0}
            />
            <StatCard
              label="Total Spent"
              value={`$${totalSpent.toLocaleString()}`}
              trend={totalLimit > 0 ? `${Math.round((totalSpent / totalLimit) * 100)}%` : '0%'}
              trendType={totalSpent > totalLimit ? 'down' : 'up'}
              icon={TrendingDown}
              index={1}
            />
            <StatCard
              label="Over Budget"
              value={`${overBudget} ${overBudget === 1 ? 'category' : 'categories'}`}
              trendType="down"
              icon={AlertTriangle}
              index={2}
            />
          </>
        )}
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-4 max-w-2xl">
          <h2 className="text-lg font-semibold text-foreground">
            {editingBudgetId ? 'Edit Budget' : 'Create New Budget'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="Category Name"
              value={formData.categoryName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, categoryName: e.target.value }))
              }
              className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none"
            />

            <input
              type="number"
              placeholder="Monthly Limit"
              value={formData.monthlyLimit}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, monthlyLimit: e.target.value }))
              }
              className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none"
            />

            <input
              type="number"
              placeholder="Spent Amount"
              value={formData.spentAmount}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, spentAmount: e.target.value }))
              }
              className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none"
            />

            <input
              type="number"
              placeholder="Month"
              value={formData.month}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, month: Number(e.target.value) }))
              }
              className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none"
            />

            <input
              type="number"
              placeholder="Year"
              value={formData.year}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, year: Number(e.target.value) }))
              }
              className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground outline-none"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSaveBudget} className="rounded-xl">
              {editingBudgetId ? 'Update Budget' : 'Save Budget'}
            </Button>
            <Button variant="outline" onClick={resetForm} className="rounded-xl">
              Cancel
            </Button>
          </div>
        </div>
      )}

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
            <BudgetCard
              key={b.id}
              budget={b}
              variants={itemVariants}
              onDelete={handleDeleteBudget}
              onEdit={handleEditBudget}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}