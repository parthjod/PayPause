// src/components/QRDecoder/CameraView.tsx
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { parseUPILink } from '../../lib/upiParser';
import type { UPIPayload } from '../../types/upi';

interface CameraViewProps {
  onResult: (payload: UPIPayload) => void;
  onError: (msg: string) => void;
}

export function CameraView({ onResult, onError }: CameraViewProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  async function startCamera() {
    try {
      const { BrowserQRCodeReader } = await import('@zxing/browser');
      const reader = new BrowserQRCodeReader();
      const result = await reader.decodeOnceFromVideoDevice(
        undefined,
        videoRef.current ?? undefined,
      );
      const parsed = parseUPILink(result.getText());
      onResult(parsed);
    } catch {
      onError('Could not read a QR code. Try uploading a screenshot instead.');
    }
  }

  return (
    <div className="camera-view">
      <video
        ref={videoRef}
        className="camera-preview"
        aria-label="Camera preview"
        playsInline
        muted
      />
      <button className="scan-button" onClick={startCamera}>
        {t('ui.scanCamera')}
      </button>
    </div>
  );
}
