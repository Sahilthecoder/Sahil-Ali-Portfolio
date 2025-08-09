import { useInView } from 'react-intersection-observer';
import { type RefObject } from 'react';

/**
 * Custom hook for handling scroll animations with intersection observer
 * @param options - Intersection observer options
 * @returns A tuple containing the ref and inView state
 */
export const useScrollAnimation = (
  options: IntersectionObserverInit = { threshold: 0.1 }
): [RefObject<HTMLElement>, boolean] => {
  const [ref, inView] = useInView({
    ...options,
    triggerOnce: true,
  });

  return [ref as unknown as RefObject<HTMLElement>, inView];
};
