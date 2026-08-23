// src/components/QRDecoder/UploadView.tsx
import { useTranslation } from 'react-i18next';
import { parseUPILink } from '../../lib/upiParser';
import type { UPIPayload } from '../../types/upi';

interface UploadViewProps {
  onResult: (payload: UPIPayload) => void;
  onError: (msg: string) => void;
}

export function UploadView({ onResult, onError }: UploadViewProps) {
  const { t } = useTranslation();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { BrowserQRCodeReader } = await import('@zxing/browser');
      const reader = new BrowserQRCodeReader();
      const img = await createImageBitmap(file);
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context unavailable');
      ctx.drawImage(img, 0, 0);
      // ZXing expects HTMLCanvasElement; OffscreenCanvas is compatible for data access
      const result = await reader.decodeFromCanvas(
        canvas as unknown as HTMLCanvasElement,
      );
      onResult(parseUPILink(result.getText()));
    } catch {
      onError('No QR code found in image. Try a clearer screenshot.');
    }
  }

  return (
    <div className="upload-view">
      <label className="upload-label">
        <span>📷 {t('ui.uploadQR')}</span>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleUpload}
          aria-label={t('ui.uploadQR')}
        />
      </label>
    </div>
  );
}
