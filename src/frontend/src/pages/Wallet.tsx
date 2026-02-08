import { useGetCallerBalance } from '../hooks/useWallet';
import DepositWithdrawCard from '../components/wallet/DepositWithdrawCard';
import TransactionHistory from '../components/wallet/TransactionHistory';
import CryptoCard from '../components/common/CryptoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Wallet as WalletIcon } from 'lucide-react';

export default function Wallet() {
  const { data: balance, isLoading } = useGetCallerBalance();

  return (
    <div className="min-h-screen space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="text-sm text-muted-foreground">Manage your funds</p>
      </div>

      {/* Balance Card */}
      <CryptoCard glow className="p-6">
        <div className="flex items-center gap-3 text-muted-foreground">
          <WalletIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Total Balance</span>
        </div>
        {isLoading ? (
          <Skeleton className="mt-3 h-10 w-48" />
        ) : (
          <div className="mt-3 text-4xl font-bold">
            ${(Number(balance || 0n) / 100).toFixed(2)}
          </div>
        )}
        <div className="mt-1 text-sm text-muted-foreground">USDT</div>
      </CryptoCard>

      {/* Deposit/Withdraw */}
      <DepositWithdrawCard />

      {/* Transaction History */}
      <TransactionHistory />
    </div>
  );
}
