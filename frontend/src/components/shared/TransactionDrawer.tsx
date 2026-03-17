import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CategoryBadge from '@/components/shared/CategoryBadge';
import { type Transaction } from '@/data/mockData';

interface TransactionDrawerProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export default function TransactionDrawer({ transaction, onClose }: TransactionDrawerProps) {
  return (
    <AnimatePresence>
      {transaction && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-elevated z-50 overflow-y-auto"
          >
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-bold text-foreground tracking-tight">Transaction Details</h2>
                <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-8 text-center py-6 bg-secondary/50 rounded-2xl">
                <p className={`text-3xl font-bold tabular-nums tracking-tight ${transaction.type === 'expense' ? 'text-foreground' : 'text-success'}`}>
                  {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{transaction.merchant}</p>
              </div>

              <div className="space-y-5">
                {[
                  { l: 'Date', v: transaction.date },
                  { l: 'Account', v: transaction.account },
                  { l: 'Status', v: transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1) },
                ].map(({ l, v }) => (
                  <div key={l} className="flex justify-between items-center py-3 border-b border-border/50">
                    <p className="text-[12px] text-muted-foreground font-medium uppercase tracking-wider">{l}</p>
                    <p className="text-sm font-medium text-foreground">{v}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <p className="text-[12px] text-muted-foreground font-medium uppercase tracking-wider">Category</p>
                  <CategoryBadge category={transaction.category} />
                </div>
              </div>
              <div className="mt-8">
                <Button variant="outline" className="w-full rounded-xl h-11">Edit Category</Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
