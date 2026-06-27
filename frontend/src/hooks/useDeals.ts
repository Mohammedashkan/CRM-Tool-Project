import { useQuery } from '@tanstack/react-query';
import { fetchDeals } from '../api/deals';

export function useDeals() {
  return useQuery({
    queryKey: ['deals'],
    queryFn: fetchDeals,
    staleTime: 1000 * 60
  });
}
