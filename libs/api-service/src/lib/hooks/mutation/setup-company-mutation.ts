import { useMutation } from '@tanstack/react-query';
import { setupCompany } from '../../company-api';

const mutationFn = (args: any) => setupCompany(args.data);
export const useSetupCompanyMutation = (options?: any) => {
  return useMutation<any, any, any>({
    mutationFn: mutationFn,
    ...options,
  });
};
