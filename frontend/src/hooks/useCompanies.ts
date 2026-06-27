import { useQuery } from '@tanstack/react-query';
import { fetchCompanies } from '../api/companies';

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
    staleTime: 1000 * 60
  });
}
