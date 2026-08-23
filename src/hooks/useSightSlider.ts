// src/hooks/useSightSlider.ts

import { useCallback, useEffect, useRef, useState } from 'react';

const ORIGINAL_COUNT = 5;
const SET_COUNT = 3; // 3 cloned sets = 15 cards total

export function useSightSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Start in the middle set so we can loop in both directions
  const [active, setActive] = useState(ORIGINAL_COUNT);

  const getShift = useCallback((index: number): string => {
    const track = trackRef.current;
    if (!track) return '0px';
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return '0px';
    const gap = parseFloat(getComputedStyle(track).columnGap || '0');
    return `${-(card.offsetWidth + gap) * index}px`;
  }, []);

  // Write --sights-shift and toggle .is-active whenever active changes
  useEffect(() => {
    document.documentElement.style.setProperty('--sights-shift', getShift(active));
    const track = trackRef.current;
    if (!track) return;
    Array.from(track.children).forEach((el, i) => {
      el.classList.toggle('is-active', i === active);
    });
  }, [active, getShift]);

  const move = useCallback((dir: 1 | -1) => {
    setActive(prev => prev + dir);
  }, []);

  const select = useCallback((index: number) => {
    if (isFinite(index)) setActive(index);
  }, []);

  // Jump without animation — used for seamless infinite loop normalization
  const jumpTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (track) track.classList.add('is-jumping');
    setActive(index);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (track) track.classList.remove('is-jumping');
      });
    });
  }, []);

  const normalize = useCallback(() => {
    setActive(prev => {
      if (prev >= ORIGINAL_COUNT * 2) {
        const next = prev - ORIGINAL_COUNT;
        // Schedule jump without triggering another state update cycle
        requestAnimationFrame(() => requestAnimationFrame(() => jumpTo(next)));
        return prev;
      }
      if (prev < ORIGINAL_COUNT) {
        const next = prev + ORIGINAL_COUNT;
        requestAnimationFrame(() => requestAnimationFrame(() => jumpTo(next)));
        return prev;
      }
      return prev;
    });
  }, [jumpTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('transitionend', normalize);
    return () => track.removeEventListener('transitionend', normalize);
  }, [normalize]);

  return {
    trackRef,
    active,
    move,
    select,
    totalCards: ORIGINAL_COUNT * SET_COUNT,
  };
}
