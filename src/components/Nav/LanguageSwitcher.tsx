// src/components/Nav/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/index';

export function LanguageSwitcher() {
  const { t } = useTranslation();

  function toggle() {
    const next = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('paypause-lang', next);
  }

  return (
    <button
      className="language-switcher"
      onClick={toggle}
      aria-label="Change language"
    >
      <span>{t('ui.languageLabel')}</span>
      <span aria-hidden="true" style={{ marginBottom: "10px" }}>⌄</span>
    </button>
  );
}
