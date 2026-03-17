import { motion, Variants } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { type BankAccount } from '@/data/mockData';

const typeLabels: Record<string, string> = { checking: 'Checking', savings: 'Savings', credit: 'Credit Card' };
const typeColors: Record<string, string> = { checking: 'bg-primary/10 text-primary', savings: 'bg-success/10 text-success', credit: 'bg-warning/10 text-warning' };

interface AccountCardProps {
  account: BankAccount;
  variants?: Variants;
}

export default function AccountCard({ account: acc, variants }: AccountCardProps) {
  return (
    <motion.div
      variants={variants}
      className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
            {acc.logo}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{acc.institution}</p>
            <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-md mt-0.5 ${typeColors[acc.type]}`}>
              {typeLabels[acc.type]}
            </span>
          </div>
        </div>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Current Balance</p>
          <p className={`text-2xl font-bold tabular-nums tracking-tight mt-0.5 ${acc.balance < 0 ? 'text-destructive' : 'text-foreground'}`}>
            {acc.balance < 0 ? '-' : ''}${Math.abs(acc.balance).toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between items-end pt-3 border-t border-border/50">
          <div>
            <p className="text-[11px] text-muted-foreground font-medium">Available</p>
            <p className="text-sm font-semibold tabular-nums text-foreground">${acc.availableBalance.toLocaleString()}</p>
          </div>
          <p className="text-[10px] text-muted-foreground">Synced {acc.lastSynced}</p>
        </div>
      </div>
    </motion.div>
  );
}
