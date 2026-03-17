import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
}

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionIcon: ActionIcon, onAction }: EmptyStateProps) {
  return (
    <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto">{description}</p>
      {actionLabel && (
        <Button className="mt-6 rounded-xl" onClick={onAction}>
          {ActionIcon && <ActionIcon className="w-4 h-4 mr-1.5" />}
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
