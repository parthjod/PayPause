// src/components/CinemaScroll/SightsSlider/SightCard.tsx
import type { KeyboardEvent } from 'react';
import type { SightCardData } from './sightCards';
import '../../../styles/SightCard.css';

interface SightCardProps extends SightCardData {
  index: number;
  onSelect: (index: number) => void;
}

export function SightCard({ ariaLabel, kicker, heading, body, Icon, index, onSelect }: SightCardProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(index);
    }
  }

  return (
    <article
      className="sight-card"
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      data-sight-index={index}
      onClick={() => onSelect(index)}
      onKeyDown={handleKeyDown}
    >
      <span className="sight-kicker">{kicker}</span>
      <span className="sight-pin">
        <Icon />
      </span>
      <h3>{heading}</h3>
      <p>{body}</p>
    </article>
  );
}
