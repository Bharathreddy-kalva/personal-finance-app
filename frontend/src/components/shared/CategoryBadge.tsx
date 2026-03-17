const categoryStyles: Record<string, string> = {
  Groceries: 'bg-warning/10 text-warning border-warning/20',
  Dining: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
  Entertainment: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
  Transport: 'bg-chart-5/10 text-chart-5 border-chart-5/20',
  Shopping: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
  Utilities: 'bg-muted text-muted-foreground border-border',
  Health: 'bg-success/10 text-success border-success/20',
  Travel: 'bg-chart-5/10 text-chart-5 border-chart-5/20',
  Rent: 'bg-primary/10 text-primary border-primary/20',
  Tech: 'bg-primary/10 text-primary border-primary/20',
  Salary: 'bg-success/10 text-success border-success/20',
  Freelance: 'bg-success/10 text-success border-success/20',
};

export default function CategoryBadge({ category }: { category: string }) {
  const style = categoryStyles[category] || 'bg-muted text-muted-foreground border-border';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${style}`}>
      {category}
    </span>
  );
}
