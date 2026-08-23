// src/components/CinemaScroll/StoryPanel.tsx
import { useTranslation } from 'react-i18next';
import { NoteButton } from '../shared/NoteButton';

interface Fact {
  dt: string;
  dd: string;
}

interface StoryPanelProps {
  id?: string;
  className: string;
  ariaLabel: string;
  headingKey: string;
  bodyKey: string;
  facts?: Fact[];
  noteButton?: boolean;
}

export function StoryPanel({
  id,
  className,
  ariaLabel,
  headingKey,
  bodyKey,
  facts,
  noteButton,
}: StoryPanelProps) {
  const { t } = useTranslation();

  return (
    <section
      id={id}
      className={`story-panel ${className}`}
      aria-label={ariaLabel}
    >
      <h2>{t(headingKey)}</h2>
      <p>{t(bodyKey)}</p>

      {facts && facts.length > 0 && (
        <dl className="facts">
          {facts.map(({ dt, dd }) => (
            <div key={dt}>
              <dt>{dt}</dt>
              <dd>{dd}</dd>
            </div>
          ))}
        </dl>
      )}

      {noteButton && <NoteButton />}
    </section>
  );
}
