import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ReferralEarning } from '../backend';

export function useGetCallerReferralEarnings() {
  const { actor, isFetching } = useActor();

  return useQuery<ReferralEarning[]>({
    queryKey: ['callerReferralEarnings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerReferralEarnings();
    },
    enabled: !!actor && !isFetching,
  });
}
