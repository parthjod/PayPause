// src/components/QRDecoder/QRDecoder.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CameraView } from './CameraView';
import { UploadView } from './UploadView';
import { UPIBreakdown } from './UPIBreakdown';
import type { UPIPayload } from '../../types/upi';
import '../../styles/QRDecoder.css';

type Mode = 'camera' | 'upload';

export function QRDecoder() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>('camera');
  const [payload, setPayload] = useState<UPIPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleResult(p: UPIPayload) {
    setPayload(p);
    setError(null);
  }

  function handleError(msg: string) {
    setError(msg);
    setPayload(null);
  }

  return (
    <div className="qr-decoder">
      <h1>QR Decoder</h1>
      <p className="qr-decoder-subtitle">
        Scan or upload a QR code to see whether it sends money out of your account or brings money in — before you tap.
      </p>

      <div className="qr-mode-tabs" role="tablist">
        <button
          className={`qr-tab ${mode === 'camera' ? 'is-active' : ''}`}
          role="tab"
          aria-selected={mode === 'camera'}
          onClick={() => setMode('camera')}
        >
          {t('ui.scanCamera')}
        </button>
        <button
          className={`qr-tab ${mode === 'upload' ? 'is-active' : ''}`}
          role="tab"
          aria-selected={mode === 'upload'}
          onClick={() => setMode('upload')}
        >
          {t('ui.uploadQR')}
        </button>
      </div>

      {mode === 'camera' ? (
        <CameraView onResult={handleResult} onError={handleError} />
      ) : (
        <UploadView onResult={handleResult} onError={handleError} />
      )}

      {error && (
        <p className="qr-error" role="alert">{error}</p>
      )}

      {payload && <UPIBreakdown payload={payload} />}
    </div>
  );
}
