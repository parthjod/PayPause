// src/components/QRDecoder/UPIBreakdown.tsx
import { useTranslation } from 'react-i18next';
import type { UPIPayload } from '../../types/upi';

interface UPIBreakdownProps {
  payload: UPIPayload;
}

export function UPIBreakdown({ payload }: UPIBreakdownProps) {
  const { t } = useTranslation();

  return (
    <div className="upi-breakdown">
      <div className={`upi-direction ${payload.direction}`}>
        <span aria-hidden="true">{payload.direction === 'outgoing' ? '🔴' : '🟢'}</span>
        <span>{payload.direction === 'outgoing' ? t('ui.outgoing') : t('ui.collect')}</span>
      </div>

      {payload.payeeName && (
        <div className="upi-field">
          <span className="upi-label">{t('ui.payee')}</span>
          <span className="upi-value">{payload.payeeName}</span>
        </div>
      )}

      {payload.payeeAddress && (
        <div className="upi-field">
          <span className="upi-label">{t('ui.upiId')}</span>
          <span className="upi-value">{payload.payeeAddress}</span>
        </div>
      )}

      {payload.amount && (
        <div className="upi-field">
          <span className="upi-label">{t('ui.amount')}</span>
          <span className="upi-value">₹{payload.amount}</span>
        </div>
      )}

      {payload.transactionRef && (
        <div className="upi-field">
          <span className="upi-label">{t('ui.ref')}</span>
          <span className="upi-value">{payload.transactionRef}</span>
        </div>
      )}
    </div>
  );
}
