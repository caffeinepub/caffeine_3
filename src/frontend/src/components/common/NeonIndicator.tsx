import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NeonIndicatorProps {
  value: number;
  showIcon?: boolean;
  className?: string;
}

export default function NeonIndicator({ value, showIcon = true, className }: NeonIndicatorProps) {
  const isPositive = value >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <span className={cn('flex items-center gap-1 font-medium', isPositive ? 'crypto-up' : 'crypto-down', className)}>
      {showIcon && <Icon className="h-4 w-4" />}
      {isPositive ? '+' : ''}{value.toFixed(2)}%
    </span>
  );
}
