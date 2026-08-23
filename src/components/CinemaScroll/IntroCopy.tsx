// src/components/CinemaScroll/IntroCopy.tsx
import { useTranslation } from 'react-i18next';

export function IntroCopy() {
  const { t } = useTranslation();

  return (
    <section className="intro-copy" aria-label="PayPause overview">
      <p>{t('hero.tagline')}</p>
      <div className="hero-tags" aria-label="PayPause highlights">
        <span>{t('hero.tags.upiSafe')}</span>
        <span>{t('hero.tags.onDevice')}</span>
        <span>{t('hero.tags.plainLanguage')}</span>
      </div>
    </section>
  );
}
