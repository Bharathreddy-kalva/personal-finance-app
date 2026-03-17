import { useEffect, useMemo, useState } from 'react';
import { Search, X, ChevronDown, ArrowLeftRight } from 'lucide-react';
import TransactionTable from '@/components/shared/TransactionTable';
import TransactionDrawer from '@/components/shared/TransactionDrawer';
import EmptyState from '@/components/shared/EmptyState';
import { TransactionTableSkeleton } from '@/components/shared/Skeletons';
import { getTransactions, type TransactionResponse } from '@/services/financeDataService';

const CATEGORIES = [
  'Dining',
  'Groceries',
  'Transport',
  'Income',
  'Shopping',
  'Bills',
  'Entertainment',
  'Utilities',
];

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selected, setSelected] = useState<any | null>(null);
  const [items, setItems] = useState<TransactionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
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

        const data = await getTransactions(email);
        setItems(data);
      } catch (error) {
        console.error('Failed to load transactions:', error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const mappedTransactions = useMemo(
    () =>
      items.map((tx) => ({
        id: tx.id,
        merchant: tx.merchantName,
        description: tx.description,
        date: tx.date,
        amount: tx.amount,
        category: tx.category,
        status: tx.status,
        account: tx.accountName,
        icon: '💳',
      })),
    [items]
  );

  const filtered = mappedTransactions.filter((tx) => {
    const matchSearch =
      tx.merchant.toLowerCase().includes(search.toLowerCase()) ||
      tx.description.toLowerCase().includes(search.toLowerCase());

    const matchCategory = !categoryFilter || tx.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Transactions</h1>
        <p className="text-sm text-muted-foreground mt-1.5">View and manage all your transactions.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2.5 bg-card border border-border rounded-xl px-3.5 py-2.5 flex-1 transition-colors focus-within:border-primary/30">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground/70"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-card border border-border rounded-xl px-3.5 py-2.5 pr-9 text-sm text-foreground outline-none focus:border-primary/30 transition-colors h-full cursor-pointer"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {isLoading ? (
        <TransactionTableSkeleton rows={8} />
      ) : filtered.length === 0 && !search && !categoryFilter ? (
        <EmptyState
          icon={ArrowLeftRight}
          title="No transactions yet"
          description="Your transactions will appear here once you connect a bank account and sync your data."
        />
      ) : (
        <TransactionTable transactions={filtered} onSelect={setSelected} />
      )}

      <TransactionDrawer transaction={selected} onClose={() => setSelected(null)} />
    </div>
  );
}