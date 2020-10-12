import { Selector, useSelector } from 'react-redux';
import { useEffect, DependencyList } from 'react';

export function useSubscription<TState, TSelected>(
  params: { selector: Selector<TState, TSelected>; subscribe: () => void },
  deps: DependencyList,
) {
  const { selector, subscribe } = params;
  const selected = useSelector(selector);

  useEffect(subscribe, deps);

  return selected;
}
