import { motion, Variants } from 'framer-motion';
import { type Budget } from '@/data/mockData';

interface BudgetCardProps {
  budget: Budget;
  variants?: Variants;
}

export default function BudgetCard({ budget: b, variants }: BudgetCardProps) {
  const pct = Math.min((b.spent / b.limit) * 100, 100);
  const over = b.spent > b.limit;
  const remaining = b.limit - b.spent;

  return (
    <motion.div
      variants={variants}
      className={`bg-card border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 ${over ? 'border-destructive/30' : 'border-border'}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg">
            {b.icon}
          </div>
          <span className="text-sm font-semibold text-foreground">{b.category}</span>
        </div>
        {over && (
          <span className="text-[10px] font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-md uppercase tracking-wide">Over</span>
        )}
      </div>
      <div className="space-y-3">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className={`h-full rounded-full ${over ? 'bg-destructive' : pct > 75 ? 'bg-warning' : 'bg-primary'}`}
          />
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-muted-foreground">Spent <strong className="text-foreground tabular-nums">${b.spent}</strong></span>
          <span className="text-muted-foreground">of <strong className="text-foreground tabular-nums">${b.limit}</strong></span>
        </div>
        <p className={`text-[12px] font-semibold ${over ? 'text-destructive' : 'text-success'}`}>
          {over ? `$${Math.abs(remaining)} over budget` : `$${remaining} remaining`}
        </p>
      </div>
    </motion.div>
  );
}
