import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

export default function ChartCard({ title, subtitle, headerRight, children, className = '', variants }: ChartCardProps) {
  const Wrapper = variants ? motion.div : 'div';
  const wrapperProps = variants ? { variants } : {};

  return (
    <Wrapper {...(wrapperProps as any)} className={`bg-card border border-border rounded-2xl shadow-card overflow-hidden ${className}`}>
      <div className="px-6 py-5 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-foreground tracking-tight">{title}</h3>
          {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {headerRight}
      </div>
      {children}
    </Wrapper>
  );
}
