import { useEffect } from 'react';
import { useAnimation, AnimationControls } from 'framer-motion';

interface UseExperienceAnimationsOptions {
  yOffset?: number;
  staggerDelay?: number;
  initialDelay?: number;
}

export function useExperienceAnimations(
  ref: React.RefObject<HTMLElement>,
  options: UseExperienceAnimationsOptions = {}
): { controls: AnimationControls } {
  const controls = useAnimation();
  const {
    yOffset = 10,
    staggerDelay = 0.1,
    initialDelay = 0.2,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let observer: IntersectionObserver | null = null;

    function onIntersect(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          controls.start('visible');
          if (observer) observer.disconnect();
        }
      });
    }

    observer = new IntersectionObserver(onIntersect, {
      threshold: 0.1,
    });

    observer.observe(element);

    // Initial state before animation
    controls.set('hidden');

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [controls, ref]);

  return { controls };
}
