import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

interface SpendingTrendChartProps {
  data: Array<{ month: string; income: number; expenses: number }>;
}

export default function SpendingTrendChart({ data }: SpendingTrendChartProps) {
  return (
    <div className="px-6 pb-6 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(156,52%,43%)" stopOpacity={0.12} />
              <stop offset="100%" stopColor="hsl(156,52%,43%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(243,55%,53%)" stopOpacity={0.12} />
              <stop offset="100%" stopColor="hsl(243,55%,53%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(220,10%,46%)' }} axisLine={false} tickLine={false} dy={8} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(220,10%,46%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} dx={-4} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid hsl(220,13%,91%)',
              fontSize: 12,
              boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
          />
          <Area type="monotone" dataKey="income" stroke="hsl(156,52%,43%)" fill="url(#incomeGrad)" strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="expenses" stroke="hsl(243,55%,53%)" fill="url(#expenseGrad)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
