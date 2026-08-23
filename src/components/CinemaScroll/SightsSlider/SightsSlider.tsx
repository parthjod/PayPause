// src/components/CinemaScroll/SightsSlider/SightsSlider.tsx
import type { Ref } from 'react';
import { SIGHT_CARDS } from './sightCards';
import { SightCard } from './SightCard';
import '../../../styles/SightsSlider.css';

const SET_COUNT = 3;

interface SightsSliderProps {
  trackRef: Ref<HTMLDivElement>;
  onSelect: (index: number) => void;
}

export function SightsSlider({ trackRef, onSelect }: SightsSliderProps) {
  // Build 3 sets of 5 cards = 15 total
  const allCards = Array.from({ length: SET_COUNT }, (_, setIdx) =>
    SIGHT_CARDS.map((card, cardIdx) => ({
      ...card,
      globalIndex: setIdx * SIGHT_CARDS.length + cardIdx,
    })),
  ).flat();

  return (
    <section
      className="sights-slider"
      id="features"
      aria-label="PayPause features slider"
    >
      <div className="sights-track" ref={trackRef}>
        {allCards.map((card) => (
          <SightCard
            key={card.globalIndex}
            {...card}
            index={card.globalIndex}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
