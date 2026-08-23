// src/hooks/useScrollProgress.ts
// rAF-based scroll engine: Hero -> Arch/Panel 1 -> Bazaar/Panel 2 -> Scam Check Tool

import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

const set = (k: string, v: string) =>
  document.documentElement.style.setProperty(k, v);

export function useScrollProgress(
  stageRef: RefObject<HTMLElement | null>,
  controlsRef: RefObject<HTMLElement | null>,
): void {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    let rafId: number;

    function tick() {
      const scrollY = window.scrollY;

      // ── Breakpoints across 3800px scroll range ───────────────
      // 0–550px: Hero Section (PAYPAUSE Title & Bottom Tagline Exit)
      const introExit           = smoothstep(0,    550,  scrollY);

      // 450–1550px: Arch Camera Pass-Through & Splitframe Parting
      const frame2Enter         = smoothstep(400,  950,  scrollY);
      const frame2Exit          = smoothstep(1050, 1550, scrollY);

      // 1550–2550px: Sunlit Bazaar Scene & Story Panel 2
      const frame3Enter         = smoothstep(1550, 2050, scrollY);
      const frame3Exit          = smoothstep(2150, 2550, scrollY);

      // 2550–3800px: Embedded Scam Check Section on the final page
      const checkEnter          = smoothstep(2550, 2950, scrollY);

      // Blur is ONLY active during the arch pass-through (Frame 2)
      // During all subsequent sections (Bazaar, Check Tool), blur is 0px
      const blurActive = frame2Enter * (1 - frame2Exit);
      const splitDrift = frame2Enter;

      const totalScroll = 3800 - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / totalScroll, 0), 1);

      // Mouse Parallax values
      const mxStr = document.documentElement.style.getPropertyValue('--mx') || '0';
      const myStr = document.documentElement.style.getPropertyValue('--my') || '0';
      const mouseX = parseFloat(mxStr) || 0;
      const mouseY = parseFloat(myStr) || 0;

      // ── 1. Hero Title: PAYPAUSE ──────────────────────────────
      set('--title-y',       `${introExit * -180 + mouseY * 6}px`);
      set('--title-scale',   String(1 - introExit * 0.12));
      set('--title-opacity', String(1 - introExit));

      // ── 2. Intro Copy (Bottom Glass Capsule) ─────────────────
      set('--intro-copy-y',       `${introExit * 80}px`);
      set('--intro-copy-opacity', String(1 - introExit));

      // ── 3. Background Layers (Sky, Mountains, Town) ──────────
      const backScale = 1 + progress * 0.10;
      set('--back-scale',  String(backScale));
      set('--back-x',      `${mouseX * -10}px`);
      set('--back-y',      `${mouseY * -4}px`);

      set('--four-y',      `${progress * 6}vh`);
      set('--four-scale',  String(1 + progress * 0.08));

      set('--bazaar-y',          `${-progress * 4}vh`);
      set('--bazaar-saturation', String(1 + frame3Enter * 0.25));
      set('--bazaar-brightness', '1');

      // ── 4. Arch Foreground (Bridge) ──────────────────────────
      const bridgeY = -frame2Enter * 60 - frame2Exit * 650 + mouseY * 8;
      const bridgeScale = 1 + frame2Enter * 0.65 + frame2Exit * 1.35;
      set('--bridge-x',     `${mouseX * 14}px`);
      set('--bridge-y',     `${bridgeY}px`);
      set('--bridge-scale', String(bridgeScale));

      // ── 5. Splitframe Towers (Left & Right) ──────────────────
      const splitLeftX = -splitDrift * 44 - frame2Exit * 20;
      const splitRightX = splitDrift * 44 + frame2Exit * 20;
      const splitY = -splitDrift * 50 - frame2Exit * 90 + mouseY * 8;
      const splitScale = 1 + frame2Enter * 0.28 + frame2Exit * 0.2;

      set('--split-left-x',     `calc(${splitLeftX}vw + ${mouseX * 18}px)`);
      set('--split-left-y',     `${splitY}px`);
      set('--split-left-scale', String(splitScale));

      set('--split-right-x',     `calc(${splitRightX}vw + ${mouseX * 18}px)`);
      set('--split-right-y',     `${splitY}px`);
      set('--split-right-scale', String(splitScale));

      // ── 6. Navy Shade & Blur Overlay (Frame 2 only) ──────────
      set('--blur-px',           `${blurActive * 12}px`);
      set('--back-brightness',   String(1 - blurActive * 0.15));
      set('--shade-top-alpha',   String(blurActive * 0.45));
      set('--shade-mid-alpha',   String(blurActive * 0.38));
      set('--shade-bottom-alpha',String(blurActive * 0.50));
      set('--shade-z',           blurActive > 0.02 ? '5' : '0');

      // ── 7. Story Panel 1 (The pause before you pay) ──────────
      const panel2Opacity = Math.max(0,
        Math.min(frame2Enter * 1.8, 1) * (1 - frame2Exit * 1.8));
      const panel2Y = (1 - frame2Enter) * 45 - frame2Exit * 65;
      set('--panel2-opacity', String(panel2Opacity));
      set('--panel2-y',       `${panel2Y}px`);

      // ── 8. Story Panel 2 (Check like forwarding to a friend) ──
      const panel3Opacity = Math.max(0,
        Math.min(frame3Enter * 1.8, 1) * (1 - frame3Exit * 1.8));
      const panel3Y = (1 - frame3Enter) * 45 - frame3Exit * 65;
      set('--panel3-opacity', String(panel3Opacity));
      set('--panel3-y',       `${panel3Y}px`);

      // ── 9. Embedded Scam Check Section on Final Page ─────────
      set('--check-opacity',    String(checkEnter));
      set('--check-y',          `${(1 - checkEnter) * 40}px`);
      set('--check-visibility', checkEnter > 0.01 ? 'visible' : 'hidden');
      set('--check-events',     checkEnter > 0.7 ? 'auto' : 'none');

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduceMotion, stageRef, controlsRef]);
}
