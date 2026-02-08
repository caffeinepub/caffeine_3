import { useState } from 'react';
import { useGetInvestmentPlans } from '../hooks/useInvestmentPlans';
import PlanCard from '../components/invest/PlanCard';
import BuyNowDialog from '../components/invest/BuyNowDialog';
import { Skeleton } from '@/components/ui/skeleton';
import type { InvestmentPlan } from '../backend';

export default function Quant() {
  const { data: plans, isLoading } = useGetInvestmentPlans();
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen space-y-4 p-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Investment Plans</h1>
        <p className="text-sm text-muted-foreground">Choose a plan that fits your goals</p>
      </div>

      <div className="space-y-4">
        {plans && plans.length > 0 ? (
          plans.map((plan) => (
            <PlanCard
              key={plan.id.toString()}
              plan={plan}
              onBuyNow={() => setSelectedPlan(plan)}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">No investment plans available yet</p>
          </div>
        )}
      </div>

      {selectedPlan && (
        <BuyNowDialog
          plan={selectedPlan}
          open={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
