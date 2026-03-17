import { motion } from 'framer-motion';
import { type Transaction } from '@/data/mockData';
import CategoryBadge from '@/components/shared/CategoryBadge';

interface TransactionRowProps {
  transaction: Transaction;
  index: number;
  onClick?: (tx: Transaction) => void;
  compact?: boolean;
}

export default function TransactionRow({ transaction: tx, index, onClick, compact = false }: TransactionRowProps) {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.04, duration: 0.3 }}
        className="px-6 py-3.5 flex items-center justify-between hover:bg-secondary/40 transition-colors duration-200 cursor-pointer"
        onClick={() => onClick?.(tx)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
            {tx.merchant.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{tx.merchant}</p>
            <p className="text-[11px] text-muted-foreground">{tx.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <CategoryBadge category={tx.category} />
          <span className={`text-sm font-semibold tabular-nums ${tx.type === 'expense' ? 'text-foreground' : 'text-success'}`}>
            {tx.type === 'expense' ? '-' : '+'}${tx.amount.toLocaleString()}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      className="border-b border-border/50 hover:bg-secondary/30 transition-colors duration-200 cursor-pointer"
      onClick={() => onClick?.(tx)}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-[11px] font-bold text-muted-foreground flex-shrink-0">
            {tx.merchant.charAt(0)}
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">{tx.merchant}</span>
            <p className="text-[11px] text-muted-foreground sm:hidden">{tx.date}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-muted-foreground tabular-nums hidden sm:table-cell">{tx.date}</td>
      <td className="px-6 py-4 hidden md:table-cell"><CategoryBadge category={tx.category} /></td>
      <td className="px-6 py-4 text-sm text-muted-foreground hidden lg:table-cell">{tx.account}</td>
      <td className="px-6 py-4 hidden sm:table-cell">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${tx.status === 'completed' ? 'text-success' : tx.status === 'pending' ? 'text-warning' : 'text-destructive'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'completed' ? 'bg-success' : tx.status === 'pending' ? 'bg-warning' : 'bg-destructive'}`} />
          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <span className={`text-sm font-semibold tabular-nums ${tx.type === 'expense' ? 'text-foreground' : 'text-success'}`}>
          {tx.type === 'expense' ? '-' : '+'}${tx.amount.toLocaleString()}
        </span>
      </td>
    </motion.tr>
  );
}
