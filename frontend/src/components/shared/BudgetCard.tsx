import { motion, Variants } from 'framer-motion';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface BudgetCardItem {
  id: number;
  categoryName: string;
  monthlyLimit: number;
  spentAmount: number;
  remainingAmount: number;
  month: number;
  year: number;
}

interface BudgetCardProps {
  budget: BudgetCardItem;
  variants?: Variants;
  onDelete?: (id: number) => void;
  onEdit?: (budget: BudgetCardItem) => void;
}

export default function BudgetCard({ budget: b, variants, onDelete, onEdit }: BudgetCardProps) {
  const pct = Math.min((b.spentAmount / b.monthlyLimit) * 100, 100);
  const over = b.spentAmount > b.monthlyLimit;

  return (
    <motion.div
      variants={variants}
      className={`bg-card border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 ${
        over ? 'border-destructive/30' : 'border-border'
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg">
            💰
          </div>
          <span className="text-sm font-semibold text-foreground">{b.categoryName}</span>
        </div>

        <div className="flex items-center gap-2">
          {over && (
            <span className="text-[10px] font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-md uppercase tracking-wide">
              Over
            </span>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(b)}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary"
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(b.id)}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className={`h-full rounded-full ${
              over ? 'bg-destructive' : pct > 75 ? 'bg-warning' : 'bg-primary'
            }`}
          />
        </div>

        <div className="flex justify-between text-[12px]">
          <span className="text-muted-foreground">
            Spent <strong className="text-foreground tabular-nums">${b.spentAmount}</strong>
          </span>
          <span className="text-muted-foreground">
            of <strong className="text-foreground tabular-nums">${b.monthlyLimit}</strong>
          </span>
        </div>

        <p className={`text-[12px] font-semibold ${over ? 'text-destructive' : 'text-success'}`}>
          {over
            ? `$${Math.abs(b.remainingAmount)} over budget`
            : `$${b.remainingAmount} remaining`}
        </p>
      </div>
    </motion.div>
  );
}