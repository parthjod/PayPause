// src/components/ScamCheck/TextInput.tsx
import { useTranslation } from 'react-i18next';

interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}

export function TextInput({ value, onChange, disabled }: TextInputProps) {
  const { t } = useTranslation();

  return (
    <div className="text-input-wrapper">
      <textarea
        className="text-input-field"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={t('ui.checkPlaceholder')}
        aria-label="Suspicious message input"
        rows={6}
        disabled={disabled}
      />
    </div>
  );
}
