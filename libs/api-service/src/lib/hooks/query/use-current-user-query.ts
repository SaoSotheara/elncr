import { getMe } from '../../user-api';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '../../configs/firebase-config';
import type { User } from '../../typings/user';

export const useCurrentUserQuery = (): UseQueryResult<User, Error> & {
  user?: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
} => {
  const queryKey = ['me'];
  const [user, isLoadingFirebase, error] = useAuthState(firebaseAuth);
  const queryResult = useQuery({
    queryKey,
    queryFn: getMe,
    enabled: !isLoadingFirebase && !!user,
  });

  const getIsLoading = () => {
    if (isLoadingFirebase) {
      return true;
    }
    if (user) {
      return queryResult.isLoading;
    }
    return false;
  };

  return {
    ...queryResult,
    isLoading: getIsLoading(),
    error: error || queryResult.error,
    user: queryResult.data,
  };
};
