import { cn } from '@/lib/cn';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glow' | 'subtle';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-semibold tracking-wide',
        variant === 'default' && 'bg-primary/10 text-primary border border-primary/20',
        variant === 'glow' &&
          'bg-primary/10 text-primary border border-primary/30 shadow-sm shadow-primary/20',
        variant === 'subtle' && 'bg-muted text-muted-foreground border border-border',
        className
      )}
    >
      {children}
    </span>
  );
}
