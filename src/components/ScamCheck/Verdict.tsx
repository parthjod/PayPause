// src/components/ScamCheck/Verdict.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendFeedback } from '../../lib/feedbackApi';
import { SCAM_PATTERNS } from '../../types/scamPattern';
import type { VerdictResult } from '../../types/verdict';
import '../../styles/Verdict.css';

interface VerdictProps {
  result: VerdictResult;
}

export function Verdict({ result }: VerdictProps) {
  const { t, i18n } = useTranslation();
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const isHI = i18n.language === 'hi';
  const headline = isHI ? result.headlineHI : result.headlineEN;
  const explanation = isHI ? result.explanationHI : result.explanationEN;
  const patternMeta = SCAM_PATTERNS[result.patternKey as keyof typeof SCAM_PATTERNS];
  const patternName = isHI
    ? (result.patternNameHI || patternMeta?.nameHI || result.patternKey)
    : (result.patternNameEN || patternMeta?.nameEN || result.patternKey);

  async function handleFeedback(correct: boolean) {
    const type = correct ? 'correct' : 'incorrect';
    setFeedback(type);
    await sendFeedback({
      verdictId: result.patternKey,
      correct,
      timestamp: Date.now(),
      appVersion: '0.1.0',
    });
  }

  return (
    <div className={`verdict ${result.isScam ? 'is-scam' : 'is-safe'}`}>
      <p className="verdict-headline">{headline}</p>

      <div className="verdict-divider" />

      <p className="verdict-pattern">{patternName}</p>
      <p className="verdict-explanation">{explanation}</p>

      {/* Confidence bar */}
      {result.confidence > 0 && (
        <div className="verdict-confidence">
          <span className="verdict-confidence-label">{t('ui.confidence')}</span>
          <div className="verdict-confidence-bar">
            <div
              className="verdict-confidence-fill"
              style={{ width: `${Math.round(result.confidence * 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="verdict-divider" />

      {/* Opt-in feedback */}
      <div className="verdict-feedback">
        {feedback === null ? (
          <>
            <span className="verdict-feedback-label">{t('ui.feedbackLabel')}</span>
            <div className="verdict-feedback-buttons">
              <button onClick={() => handleFeedback(true)}>{t('ui.feedbackCorrect')}</button>
              <button onClick={() => handleFeedback(false)}>{t('ui.feedbackIncorrect')}</button>
            </div>
          </>
        ) : (
          <span className="verdict-thanks">{t('ui.feedbackThanks')}</span>
        )}
      </div>
    </div>
  );
}
