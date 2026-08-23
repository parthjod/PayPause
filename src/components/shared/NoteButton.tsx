// src/components/shared/NoteButton.tsx
import { useTranslation } from 'react-i18next';

export function NoteButton() {
  const { t } = useTranslation();

  function handleClick() {
    // Smoothly scroll to the Scam Check tool on the last scroll page
    const checkToolEl = document.getElementById('check-tool');
    if (checkToolEl) {
      window.scrollTo({ top: 3900, behavior: 'smooth' });
    } else {
      window.location.href = '/check';
    }
  }

  return (
    <button
      className="note-button"
      onClick={handleClick}
      type="button"
      aria-label="Open Scam Check tool"
    >
      <span aria-hidden="true">↗</span>
      <span>{t('ui.openDetails')}</span>
    </button>
  );
}
