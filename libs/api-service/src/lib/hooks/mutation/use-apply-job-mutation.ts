import { useMutation } from '@tanstack/react-query';
import { applyJob } from '../../job-api';

const mutationFn = (args: any) => applyJob(args.id, args.data);
export const useApplyJobMutation = (options?: any) => {
  return useMutation<any, any, any>({
    mutationFn: mutationFn,
    ...options,
  });
};
