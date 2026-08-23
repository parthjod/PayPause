// src/types/verdict.ts

export type ScamPatternKey =
  | 'FAKE_REFUND_QR'
  | 'KYC_PHISHING'
  | 'OTP_SOCIAL_ENGINEERING'
  | 'FAKE_PAYMENT_SCREENSHOT'
  | 'CUSTOMER_CARE_IMPERSONATION'
  | 'LOTTERY_PRIZE_SCAM'
  | 'PART_TIME_JOB_SCAM'
  | 'ELECTRICITY_BILL_SCAM'
  | 'COURIER_PARCEL_SCAM'
  | 'SAFE_MESSAGE'
  | 'UNKNOWN'
  | string;

export interface VerdictResult {
  isScam: boolean;
  confidence: number;
  patternKey: ScamPatternKey;
  patternNameEN?: string;
  patternNameHI?: string;
  headlineEN: string;
  headlineHI: string;
  explanationEN: string;
  explanationHI: string;
}
