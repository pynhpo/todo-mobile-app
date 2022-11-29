import {useDispatch} from 'react-redux';
import {useCallback} from 'react';

export type ResolverType = {
  resolver?: {
    resolve: (value: unknown) => void;
    reject: (reason: any) => void;
  };
};

export const useDispatchResolve = (): ((action: any) => Promise<unknown>) => {
  const dispatch = useDispatch();
  return useCallback(
    action => {
      return new Promise((resolve, reject) => {
        const newAction = {...action, resolver: {resolve, reject}};
        dispatch(newAction);
      });
    },
    [dispatch],
  );
};
