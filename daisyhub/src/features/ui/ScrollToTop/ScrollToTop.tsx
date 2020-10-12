import { useEffect, DependencyList } from 'react';

export const useScrollTo = (x: number, y: number, deps: DependencyList) => {
  useEffect(() => {
    window.scrollTo(x, y);
  }, [x, y, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};
