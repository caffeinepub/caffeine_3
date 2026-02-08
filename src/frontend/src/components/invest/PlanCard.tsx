import { Button } from '@/components/ui/button';
import CryptoCard from '../common/CryptoCard';
import { Calendar, TrendingUp, Gift } from 'lucide-react';
import type { InvestmentPlan } from '../../backend';

interface PlanCardProps {
  plan: InvestmentPlan;
  onBuyNow: () => void;
}

export default function PlanCard({ plan, onBuyNow }: PlanCardProps) {
  return (
    <CryptoCard className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="text-sm text-muted-foreground">
            Investment Range: ${Number(plan.minInvestment) / 100} - ${Number(plan.maxInvestment) / 100}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              Fixed Profit
            </div>
            <div className="text-lg font-bold crypto-up">
              {Number(plan.profitPercentage)}%
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Duration
            </div>
            <div className="text-lg font-bold">
              {Number(plan.durationDays)} Days
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Gift className="h-3 w-3" />
              Bonus
            </div>
            <div className="text-lg font-bold crypto-up">
              8%
            </div>
          </div>
        </div>

        <Button onClick={onBuyNow} className="w-full">
          Buy Now
        </Button>
      </div>
    </CryptoCard>
  );
}
