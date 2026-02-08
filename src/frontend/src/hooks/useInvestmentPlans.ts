import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { InvestmentPlan, Investment, Transaction } from '../backend';

export function useGetInvestmentPlans() {
  const { actor, isFetching } = useActor();

  return useQuery<InvestmentPlan[]>({
    queryKey: ['investmentPlans'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInvestmentPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBuyInvestmentPlan() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ planId, amount }: { planId: bigint; amount: bigint }) => {
      if (!actor || !identity) throw new Error('Not authenticated');

      const principal = identity.getPrincipal();
      const now = BigInt(Date.now() * 1000000);
      const durationMs = BigInt(30 * 24 * 60 * 60 * 1000 * 1000000);

      const investment: Investment = {
        user_id: principal,
        plan_id: planId,
        amount,
        start_date: now,
        end_date: now + durationMs,
      };

      await actor.addInvestment(investment);

      const transaction: Transaction = {
        user_id: principal,
        transaction_type: { investment: null } as any,
        status: { completed: null } as any,
        amount,
        created_at: now,
      };

      await actor.addTransaction(transaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerInvestment'] });
      queryClient.invalidateQueries({ queryKey: ['callerTransaction'] });
      queryClient.invalidateQueries({ queryKey: ['callerBalance'] });
    },
  });
}
