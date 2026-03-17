import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendType?: 'up' | 'down';
  icon: LucideIcon;
  index?: number;
  accent?: boolean;
}

export default function StatCard({ label, value, trend, trendType, icon: Icon, index = 0, accent = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      className={`relative overflow-hidden rounded-2xl p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover ${
        accent
          ? 'bg-primary text-primary-foreground'
          : 'bg-card border border-border'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <p className={`text-[11px] font-semibold uppercase tracking-wider ${accent ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{label}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent ? 'bg-primary-foreground/15' : 'bg-secondary'}`}>
          <Icon className={`w-[18px] h-[18px] ${accent ? 'text-primary-foreground/80' : 'text-muted-foreground'}`} />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold tracking-tight tabular-nums ${accent ? '' : 'text-foreground'}`}>{value}</span>
        {trend && (
          <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${
            accent
              ? 'bg-primary-foreground/15 text-primary-foreground/90'
              : trendType === 'up' ? 'text-success bg-success/10' : 'text-destructive bg-destructive/10'
          }`}>
            {trendType === 'up' ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}
