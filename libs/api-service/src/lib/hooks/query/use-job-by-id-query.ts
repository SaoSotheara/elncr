import { getJobById } from '../../job-api';
import { useQuery } from '@tanstack/react-query';

export const useJobByIdQuery = (
  id: number,
  options: {
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => getJobById(id),
    ...options,
  });
};
