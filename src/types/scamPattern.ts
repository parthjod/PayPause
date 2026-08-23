// src/types/scamPattern.ts

import type { ScamPatternKey, VerdictResult } from './verdict';

export interface ScamPatternMeta {
  key: ScamPatternKey;
  nameEN: string;
  nameHI: string;
  headlineScamEN: string;
  headlineScamHI: string;
  headlineSafeEN: string;
  headlineSafeHI: string;
  explanationEN: string;
  explanationHI: string;
}

export const SCAM_PATTERNS: Record<string, ScamPatternMeta> = {
  FAKE_REFUND_QR: {
    key: 'FAKE_REFUND_QR',
    nameEN: 'Fake Refund QR',
    nameHI: 'नकली रिफ़ंड QR',
    headlineScamEN: 'This QR code will send money out of your account, not receive it. Do not scan.',
    headlineScamHI: 'यह QR कोड आपके खाते से पैसे भेजेगा, प्राप्त नहीं करेगा। स्कैन न करें।',
    headlineSafeEN: 'This QR code looks safe.',
    headlineSafeHI: 'यह QR कोड सुरक्षित दिखता है।',
    explanationEN: 'FAKE REFUND QR — The scammer told you to scan to receive money, but the QR code initiates an outgoing payment.',
    explanationHI: 'नकली रिफ़ंड QR — स्कैमर ने आपको पैसे प्राप्त करने का झाँसा दिया, लेकिन QR कोड एक आउटगोइंग भुगतान शुरू करता है।',
  },
  KYC_PHISHING: {
    key: 'KYC_PHISHING',
    nameEN: 'KYC Phishing',
    nameHI: 'KYC फ़िशिंग',
    headlineScamEN: 'This link is asking for bank login details. Real banks do not do this.',
    headlineScamHI: 'यह लिंक बैंक लॉगिन विवरण माँग रहा है। असली बैंक ऐसा नहीं करते।',
    headlineSafeEN: 'This message looks safe.',
    headlineSafeHI: 'यह संदेश सुरक्षित दिखता है।',
    explanationEN: 'KYC PHISHING — A fake message threatening account block steals credentials via a phishing form.',
    explanationHI: 'KYC फ़िशिंग — एक नकली संदेश जो खाते को ब्लॉक होने से रोकने के बहाने क्रेडेंशियल चुराता है।',
  },
  OTP_SOCIAL_ENGINEERING: {
    key: 'OTP_SOCIAL_ENGINEERING',
    nameEN: 'OTP Social Engineering',
    nameHI: 'OTP सोशल इंजीनियरिंग',
    headlineScamEN: 'Do not share your OTP with anyone. It authorizes a transaction you did not agree to.',
    headlineScamHI: 'किसी को भी OTP न बताएँ। यह आपके खाते से लेनदेन को अधिकृत करता है।',
    headlineSafeEN: 'This message looks safe.',
    headlineSafeHI: 'यह संदेश सुरक्षित दिखता है।',
    explanationEN: 'OTP SOCIAL ENGINEERING — A caller or message asks you to read out an OTP under the pretence of verification.',
    explanationHI: 'OTP सोशल इंजीनियरिंग — एक व्यक्ति या संदेश सत्यापन के बहाने आपसे OTP माँगता है।',
  },
  FAKE_PAYMENT_SCREENSHOT: {
    key: 'FAKE_PAYMENT_SCREENSHOT',
    nameEN: 'Fake Payment Screenshot',
    nameHI: 'नकली भुगतान स्क्रीनशॉट',
    headlineScamEN: 'Do not confirm delivery based on this screenshot. No payment was made.',
    headlineScamHI: 'इस स्क्रीनशॉट से भुगतान की पुष्टि न करें। कोई भुगतान नहीं हुआ।',
    headlineSafeEN: 'This screenshot looks legitimate.',
    headlineSafeHI: 'यह स्क्रीनशॉट वैध दिखता है।',
    explanationEN: 'FAKE PAYMENT SCREENSHOT — A fabricated screenshot claims payment was sent to pressure a seller.',
    explanationHI: 'नकली भुगतान स्क्रीनशॉट — एक नकली स्क्रीनशॉट विक्रेता को दबाव में लाने के लिए भुगतान का दावा करता है।',
  },
  CUSTOMER_CARE_IMPERSONATION: {
    key: 'CUSTOMER_CARE_IMPERSONATION',
    nameEN: 'Customer Care Impersonation',
    nameHI: 'ग्राहक सेवा प्रतिरूपण',
    headlineScamEN: 'This is not a real contact from your bank or UPI provider.',
    headlineScamHI: 'यह आपके बैंक या UPI प्रदाता का असली संपर्क नहीं है।',
    headlineSafeEN: 'This message looks safe.',
    headlineSafeHI: 'यह संदेश सुरक्षित दिखता है।',
    explanationEN: 'CUSTOMER CARE IMPERSONATION — A fake number or message poses as your bank to steal credentials.',
    explanationHI: 'ग्राहक सेवा प्रतिरूपण — एक नकली नंबर या संदेश क्रेडेंशियल माँगने के लिए बैंक का रूप धारण करता है।',
  },
  UNKNOWN: {
    key: 'UNKNOWN',
    nameEN: 'Unknown Pattern',
    nameHI: 'अज्ञात पैटर्न',
    headlineScamEN: 'This message may be suspicious. Proceed with caution.',
    headlineScamHI: 'यह संदेश संदिग्ध लग सकता है। सावधान रहें।',
    headlineSafeEN: 'This message looks safe.',
    headlineSafeHI: 'यह संदेश सुरक्षित दिखता है।',
    explanationEN: 'UNKNOWN PATTERN — No known scam category matched, but remain cautious.',
    explanationHI: 'अज्ञात पैटर्न — कोई ज्ञात स्कैम श्रेणी नहीं मिली, लेकिन सतर्क रहें।',
  },
};

const DEFAULT_META: ScamPatternMeta = {
  key: 'UNKNOWN',
  nameEN: 'Unknown Pattern',
  nameHI: 'अज्ञात पैटर्न',
  headlineScamEN: 'This message may be suspicious. Proceed with caution.',
  headlineScamHI: 'यह संदेश संदिग्ध लग सकता है। सावधान रहें।',
  headlineSafeEN: 'This message looks safe.',
  headlineSafeHI: 'यह संदेश सुरक्षित दिखता है।',
  explanationEN: 'UNKNOWN PATTERN — No known scam category matched, but remain cautious.',
  explanationHI: 'अज्ञात पैटर्न — कोई ज्ञात स्कैम श्रेणी नहीं मिली, लेकिन सतर्क रहें।',
};

export function buildVerdictResult(
  isScam: boolean,
  confidence: number,
  patternKey: ScamPatternKey,
): VerdictResult {
  const meta: ScamPatternMeta = SCAM_PATTERNS[patternKey] ?? DEFAULT_META;
  return {
    isScam,
    confidence,
    patternKey,
    headlineEN: isScam ? meta.headlineScamEN : meta.headlineSafeEN,
    headlineHI: isScam ? meta.headlineScamHI : meta.headlineSafeHI,
    explanationEN: meta.explanationEN,
    explanationHI: meta.explanationHI,
  };
}
