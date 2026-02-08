import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CryptoCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function CryptoCard({ children, className, glow = false }: CryptoCardProps) {
  return (
    <Card className={cn('crypto-card', glow && 'crypto-glow', className)}>
      {children}
    </Card>
  );
}
