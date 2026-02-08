import { useState } from 'react';
import { useDeposit, useWithdraw, useGetCallerBalance } from '../../hooks/useWallet';
import { validateAmount } from '../../utils/validation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import CryptoCard from '../common/CryptoCard';
import ErrorBanner from '../common/ErrorBanner';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function DepositWithdrawCard() {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [error, setError] = useState('');

  const { data: balance } = useGetCallerBalance();
  const { mutate: deposit, isPending: isDepositing } = useDeposit();
  const { mutate: withdraw, isPending: isWithdrawing } = useWithdraw();

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numAmount = parseFloat(depositAmount);
    const amountError = validateAmount(numAmount, 1, 1000000);
    if (amountError) {
      setError(amountError);
      return;
    }

    const amountInCents = BigInt(Math.round(numAmount * 100));

    deposit(amountInCents, {
      onSuccess: () => {
        toast.success('Deposit successful!');
        setDepositAmount('');
      },
      onError: (err) => {
        setError(err.message || 'Deposit failed');
      },
    });
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numAmount = parseFloat(withdrawAmount);
    const currentBalance = Number(balance || 0n) / 100;

    if (numAmount > currentBalance) {
      setError('Insufficient balance');
      return;
    }

    const amountError = validateAmount(numAmount, 1, currentBalance);
    if (amountError) {
      setError(amountError);
      return;
    }

    const amountInCents = BigInt(Math.round(numAmount * 100));

    withdraw(amountInCents, {
      onSuccess: () => {
        toast.success('Withdrawal successful!');
        setWithdrawAmount('');
      },
      onError: (err) => {
        setError(err.message || 'Withdrawal failed');
      },
    });
  };

  return (
    <CryptoCard className="p-4">
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="space-y-4">
          {error && <ErrorBanner message={error} />}
          <form onSubmit={handleDeposit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="depositAmount">Amount (USDT)</Label>
              <Input
                id="depositAmount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isDepositing}>
              {isDepositing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Deposit'
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-4">
          {error && <ErrorBanner message={error} />}
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdrawAmount">Amount (USDT)</Label>
              <Input
                id="withdrawAmount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Available: ${(Number(balance || 0n) / 100).toFixed(2)}
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={isWithdrawing}>
              {isWithdrawing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Withdraw'
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </CryptoCard>
  );
}
