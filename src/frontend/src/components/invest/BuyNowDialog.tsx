import { useState } from 'react';
import { useBuyInvestmentPlan } from '../../hooks/useInvestmentPlans';
import { validateAmount } from '../../utils/validation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ErrorBanner from '../common/ErrorBanner';
import { Loader2 } from 'lucide-react';
import type { InvestmentPlan } from '../../backend';
import { toast } from 'sonner';

interface BuyNowDialogProps {
  plan: InvestmentPlan;
  open: boolean;
  onClose: () => void;
}

export default function BuyNowDialog({ plan, open, onClose }: BuyNowDialogProps) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const { mutate: buyPlan, isPending } = useBuyInvestmentPlan();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numAmount = parseFloat(amount);
    const minAmount = Number(plan.minInvestment) / 100;
    const maxAmount = Number(plan.maxInvestment) / 100;

    const amountError = validateAmount(numAmount, minAmount, maxAmount);
    if (amountError) {
      setError(amountError);
      return;
    }

    const amountInCents = BigInt(Math.round(numAmount * 100));

    buyPlan(
      { planId: plan.id, amount: amountInCents },
      {
        onSuccess: () => {
          toast.success('Investment successful!');
          onClose();
          setAmount('');
        },
        onError: (err) => {
          setError(err.message || 'Failed to process investment');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invest in {plan.name}</DialogTitle>
          <DialogDescription>
            Enter the amount you want to invest (${Number(plan.minInvestment) / 100} - $
            {Number(plan.maxInvestment) / 100})
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <ErrorBanner message={error} />}

          <div className="space-y-2">
            <Label htmlFor="amount">Investment Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Investment'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
