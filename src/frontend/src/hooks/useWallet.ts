import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { Transaction } from '../backend';

export function useGetCallerBalance() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint | null>({
    queryKey: ['callerBalance'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerBalance();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeposit() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: bigint) => {
      if (!actor || !identity) throw new Error('Not authenticated');

      const principal = identity.getPrincipal();
      const currentBalance = (await actor.getCallerBalance()) || 0n;
      const newBalance = currentBalance + amount;

      await actor.setCurrentBalance(newBalance);

      const transaction: Transaction = {
        user_id: principal,
        transaction_type: { deposit: null } as any,
        status: { completed: null } as any,
        amount,
        created_at: BigInt(Date.now() * 1000000),
      };

      await actor.addTransaction(transaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerBalance'] });
      queryClient.invalidateQueries({ queryKey: ['callerTransaction'] });
    },
  });
}

export function useWithdraw() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: bigint) => {
      if (!actor || !identity) throw new Error('Not authenticated');

      const principal = identity.getPrincipal();
      const currentBalance = (await actor.getCallerBalance()) || 0n;

      if (currentBalance < amount) {
        throw new Error('Insufficient balance');
      }

      const newBalance = currentBalance - amount;
      await actor.setCurrentBalance(newBalance);

      const transaction: Transaction = {
        user_id: principal,
        transaction_type: { withdrawal: null } as any,
        status: { completed: null } as any,
        amount,
        created_at: BigInt(Date.now() * 1000000),
      };

      await actor.addTransaction(transaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerBalance'] });
      queryClient.invalidateQueries({ queryKey: ['callerTransaction'] });
    },
  });
}

export function useGetCallerTransaction() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['callerTransaction'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerTransaction();
    },
    enabled: !!actor && !isFetching,
  });
}
