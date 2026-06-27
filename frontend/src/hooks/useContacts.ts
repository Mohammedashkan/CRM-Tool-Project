import { useQuery } from '@tanstack/react-query';
import { fetchContacts } from '../api/contacts';

export function useContacts() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
    staleTime: 1000 * 60
  });
}
