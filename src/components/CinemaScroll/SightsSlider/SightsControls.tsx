// src/components/CinemaScroll/SightsSlider/SightsControls.tsx
import type { Ref } from 'react';

interface SightsControlsProps {
  onPrev: () => void;
  onNext: () => void;
  controlsRef: Ref<HTMLDivElement>;
}

export function SightsControls({ onPrev, onNext, controlsRef }: SightsControlsProps) {
  return (
    <div
      className="sights-controls"
      aria-label="Slider controls"
      ref={controlsRef}
    >
      <button
        className="sight-nav sight-prev"
        aria-label="Previous feature"
        onClick={onPrev}
      >
        ←
      </button>
      <button
        className="sight-nav sight-next"
        aria-label="Next feature"
        onClick={onNext}
      >
        →
      </button>
    </div>
  );
}
