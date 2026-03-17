import { ReactNode } from 'react';
import { Receipt } from 'lucide-react';
import { type Transaction } from '@/data/mockData';
import TransactionRow from '@/components/shared/TransactionRow';

interface TransactionTableProps {
  transactions: Transaction[];
  onSelect?: (tx: Transaction) => void;
  emptyMessage?: string;
  emptySubMessage?: string;
  headerRight?: ReactNode;
}

export default function TransactionTable({ transactions, onSelect, emptyMessage = 'No transactions found', emptySubMessage = 'Try adjusting your search or filters.' }: TransactionTableProps) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3.5">Merchant</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3.5 hidden sm:table-cell">Date</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3.5 hidden md:table-cell">Category</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3.5 hidden lg:table-cell">Account</th>
              <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3.5 hidden sm:table-cell">Status</th>
              <th className="text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3.5">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <TransactionRow key={tx.id} transaction={tx} index={i} onClick={onSelect} />
            ))}
          </tbody>
        </table>
      </div>
      {transactions.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">{emptyMessage}</p>
          <p className="text-[12px] text-muted-foreground mt-1">{emptySubMessage}</p>
        </div>
      )}
    </div>
  );
}
