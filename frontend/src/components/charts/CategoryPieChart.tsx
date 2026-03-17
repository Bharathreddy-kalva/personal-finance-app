import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface CategoryPieChartProps {
  data: Array<{ name: string; value: number; fill: string }>;
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <div className="px-6 pb-6 flex flex-col items-center">
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={3} strokeWidth={0}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid hsl(220,13%,91%)',
                fontSize: 12,
                boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 w-full">
        {data.map((c) => (
          <div key={c.name} className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.fill }} />
              {c.name}
            </span>
            <span className="font-semibold text-foreground tabular-nums">${c.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
