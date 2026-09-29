import { useRef, useCallback } from 'react';

export default function useInfiniteScroll(onIntersect, enabled) {
  const observer = useRef(null);
  return useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      if (!enabled || !node) return;
      observer.current = new IntersectionObserver(
        (entries) => entries[0].isIntersecting && onIntersect(),
        { rootMargin: '300px' }
      );
      observer.current.observe(node);
    },
    [onIntersect, enabled]
  );
}