// src/hooks/useMouseParallax.ts
import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useMouseParallax(): void {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    function onMove(e: MouseEvent) {
      const mx = ((e.clientX / window.innerWidth) - 0.5).toFixed(4);
      const my = ((e.clientY / window.innerHeight) - 0.5).toFixed(4);

      document.documentElement.style.setProperty('--mx', mx);
      document.documentElement.style.setProperty('--my', my);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduceMotion]);
}
