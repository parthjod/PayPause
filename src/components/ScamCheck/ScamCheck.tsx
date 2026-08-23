// src/components/ScamCheck/ScamCheck.tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNLPWorker } from '../../hooks/useNLPWorker';
import { TextInput } from './TextInput';
import { Verdict } from './Verdict';
import type { VerdictResult } from '../../types/verdict';
import '../../styles/ScamCheck.css';

export function ScamCheck() {
  const { t } = useTranslation();
  const { classify, loading } = useNLPWorker();

  const [text, setText] = useState('');
  const [result, setResult] = useState<VerdictResult | null>(null);

  // Auto-populate from Web Share Target URL param (?text=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get('text');
    if (shared) setText(decodeURIComponent(shared));
  }, []);

  async function handleCheck() {
    if (!text.trim()) return;
    const verdict = await classify(text);
    setResult(verdict);
  }

  function handleReset() {
    setText('');
    setResult(null);
  }

  return (
    <div className={`scam-check ${result ? 'has-result' : ''}`}>
      <div className="scam-check-input-pane">
        <div className="scam-check-header">
          <h1>Scam Check</h1>
          {!result && (
            <p className="scam-check-subtitle">
              Paste a suspicious message — a WhatsApp forward, an SMS, or a payment link — and get a plain-language verdict in seconds.
            </p>
          )}
        </div>

        <TextInput value={text} onChange={setText} disabled={loading} />

        <div className="scam-check-actions">
          <button
            className="check-button"
            onClick={handleCheck}
            disabled={loading || text.trim() === ''}
          >
            {loading ? t('ui.checking') : t('ui.checkButton')}
          </button>

          {result && (
            <button
              className="clear-button"
              onClick={handleReset}
              type="button"
            >
              Check another
            </button>
          )}
        </div>

        <div className="model-inference-badge">
          <span className="badge-dot" aria-hidden="true" />
          <span>ONNX Runtime Web (WASM SIMD) • Local quantized neural model • 0 bytes sent</span>
        </div>
      </div>

      {result && (
        <div className="scam-check-result-pane">
          <Verdict result={result} />
        </div>
      )}
    </div>
  );
}
