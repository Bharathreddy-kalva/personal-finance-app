export function StatCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl p-5 bg-card border border-border shadow-card animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="h-3 w-20 bg-secondary rounded" />
            <div className="w-9 h-9 rounded-xl bg-secondary" />
          </div>
          <div className="h-7 w-28 bg-secondary rounded mt-1" />
        </div>
      ))}
    </>
  );
}

export function ChartCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-2xl shadow-card overflow-hidden ${className}`}>
      <div className="px-6 py-5 flex justify-between items-center">
        <div>
          <div className="h-4 w-32 bg-secondary rounded animate-pulse" />
          <div className="h-3 w-48 bg-secondary rounded mt-2 animate-pulse" />
        </div>
      </div>
      <div className="px-6 pb-6 h-64 flex items-center justify-center">
        <div className="w-full h-full bg-secondary/50 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export function TransactionTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="border-b border-border bg-secondary/30 px-6 py-3.5">
        <div className="flex gap-16">
          {['w-20', 'w-16', 'w-16', 'w-20', 'w-14', 'w-16'].map((w, i) => (
            <div key={i} className={`h-3 ${w} bg-secondary rounded animate-pulse ${i > 0 ? 'hidden sm:block' : ''}`} />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-6 py-4 border-b border-border/50 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary" />
            <div>
              <div className="h-4 w-32 bg-secondary rounded" />
              <div className="h-3 w-20 bg-secondary rounded mt-1.5" />
            </div>
          </div>
          <div className="h-4 w-16 bg-secondary rounded" />
        </div>
      ))}
    </div>
  );
}

export function AccountCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-card animate-pulse">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-secondary" />
            <div>
              <div className="h-4 w-24 bg-secondary rounded" />
              <div className="h-3 w-16 bg-secondary rounded mt-1.5" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="h-3 w-20 bg-secondary rounded" />
              <div className="h-7 w-32 bg-secondary rounded mt-1.5" />
            </div>
            <div className="flex justify-between items-end pt-3 border-t border-border/50">
              <div className="h-4 w-20 bg-secondary rounded" />
              <div className="h-3 w-16 bg-secondary rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export function BudgetCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-card animate-pulse">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-10 h-10 rounded-xl bg-secondary" />
            <div className="h-4 w-20 bg-secondary rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-2 bg-secondary rounded-full" />
            <div className="flex justify-between">
              <div className="h-3 w-16 bg-secondary rounded" />
              <div className="h-3 w-14 bg-secondary rounded" />
            </div>
            <div className="h-3 w-24 bg-secondary rounded" />
          </div>
        </div>
      ))}
    </>
  );
}

export function TransactionRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="px-6 py-3.5 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary" />
            <div>
              <div className="h-4 w-28 bg-secondary rounded" />
              <div className="h-3 w-16 bg-secondary rounded mt-1" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-5 w-16 bg-secondary rounded-md" />
            <div className="h-4 w-14 bg-secondary rounded" />
          </div>
        </div>
      ))}
    </>
  );
}
