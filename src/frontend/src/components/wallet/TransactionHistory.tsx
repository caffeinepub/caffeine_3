import { useGetCallerTransaction } from '../../hooks/useWallet';
import CryptoCard from '../common/CryptoCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock } from 'lucide-react';
import type { Transaction, TransactionType, TransactionStatus } from '../../backend';

const typeLabels: Record<TransactionType, string> = {
  deposit: 'Deposit',
  withdrawal: 'Withdrawal',
  investment: 'Investment',
  referralCommission: 'Referral Commission',
};

const statusVariants: Record<TransactionStatus, 'default' | 'secondary' | 'destructive'> = {
  pending: 'secondary',
  completed: 'default',
  failed: 'destructive',
};

export default function TransactionHistory() {
  const { data: transaction, isLoading } = useGetCallerTransaction();

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Transaction History</h2>

      {isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : transaction ? (
        <CryptoCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">{typeLabels[transaction.transaction_type]}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {new Date(Number(transaction.created_at) / 1000000).toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">
                ${(Number(transaction.amount) / 100).toFixed(2)}
              </div>
              <Badge variant={statusVariants[transaction.status]} className="mt-1">
                {transaction.status}
              </Badge>
            </div>
          </div>
        </CryptoCard>
      ) : (
        <CryptoCard className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No transactions yet</p>
        </CryptoCard>
      )}
    </div>
  );
}
