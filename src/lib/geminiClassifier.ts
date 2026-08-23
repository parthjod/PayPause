// src/lib/geminiClassifier.ts
// Uses Google Gemini 2.5 Flash API with structured JSON output for scam detection

import type { VerdictResult } from '../types/verdict';

const SYSTEM_PROMPT = `You are PayPause AI, an expert scam and fraud detection system specialized in Indian UPI, banking, SMS, WhatsApp, payment links, QR scams, lottery scams, job frauds, KYC phishing, electricity bill threats, and social engineering.

Analyze the user's input text and determine whether it is a scam or safe.

Return a structured JSON object with:
- isScam: boolean (true if fraudulent/scam/phishing/social engineering, false if safe or legitimate)
- confidence: number between 0.0 and 1.0 (e.g. 0.95)
- patternKey: string category key (e.g. LOTTERY_PRIZE_SCAM, KYC_PHISHING, FAKE_REFUND_QR, OTP_SOCIAL_ENGINEERING, CUSTOMER_CARE_IMPERSONATION, ELECTRICITY_BILL_SCAM, JOB_TASK_SCAM, SAFE_MESSAGE, UNKNOWN)
- patternNameEN: English display name for the scam/message type (e.g. "Lottery / Prize Scam" or "Legitimate Message")
- patternNameHI: Hindi display name (e.g. "लॉटरी / इनाम घोटाला" or "सुरक्षित संदेश")
- headlineEN: Short, clear 1-line verdict in English (e.g., "This message looks suspicious. Do not click links or pay.")
- headlineHI: Short, clear 1-line verdict in Hindi (e.g., "यह संदेश संदिग्ध लग रहा है। किसी लिंक पर क्लिक न करें।")
- explanationEN: 2-3 concise sentences in English explaining why it is a scam or safe, and actionable guidance.
- explanationHI: Hindi explanation translation matching explanationEN.`;

export async function classifyWithGemini(text: string): Promise<VerdictResult> {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      isScam: false,
      confidence: 0,
      patternKey: 'UNKNOWN',
      headlineEN: 'Please enter a message to analyze.',
      headlineHI: 'कृपया विश्लेषण के लिए एक संदेश दर्ज करें।',
      explanationEN: 'No content was provided.',
      explanationHI: 'कोई सामग्री नहीं दी गई।'
    };
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('VITE_GEMINI_API_KEY is not set in environment variables.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Analyze this message:\n\n"""\n${trimmed}\n"""`
          }
        ]
      }
    ],
    systemInstruction: {
      parts: [
        {
          text: SYSTEM_PROMPT
        }
      ]
    },
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          isScam: { type: 'BOOLEAN' },
          confidence: { type: 'NUMBER' },
          patternKey: { type: 'STRING' },
          patternNameEN: { type: 'STRING' },
          patternNameHI: { type: 'STRING' },
          headlineEN: { type: 'STRING' },
          headlineHI: { type: 'STRING' },
          explanationEN: { type: 'STRING' },
          explanationHI: { type: 'STRING' }
        },
        required: [
          'isScam',
          'confidence',
          'patternKey',
          'headlineEN',
          'headlineHI',
          'explanationEN',
          'explanationHI'
        ]
      }
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) {
      throw new Error('Empty response part from Gemini');
    }

    const parsed = JSON.parse(rawJson);
    return {
      isScam: Boolean(parsed.isScam),
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.95,
      patternKey: parsed.patternKey || (parsed.isScam ? 'UNKNOWN' : 'SAFE_MESSAGE'),
      patternNameEN: parsed.patternNameEN || (parsed.isScam ? 'Scam Detected' : 'Safe Message'),
      patternNameHI: parsed.patternNameHI || (parsed.isScam ? 'धोखाधड़ी का पता चला' : 'सुरक्षित संदेश'),
      headlineEN: parsed.headlineEN || (parsed.isScam ? 'This message looks suspicious.' : 'This message looks safe.'),
      headlineHI: parsed.headlineHI || (parsed.isScam ? 'यह संदेश संदिग्ध लग रहा है।' : 'यह संदेश सुरक्षित दिखता है।'),
      explanationEN: parsed.explanationEN || '',
      explanationHI: parsed.explanationHI || ''
    };
  } catch (err) {
    console.error('Gemini Classification Error:', err);
    // Offline heuristic fallback
    const isSuspicious = /won|lottery|claim|urgent|blocked|kyc|otp|pin|apk|bit\.ly|telegram/i.test(trimmed);
    return {
      isScam: isSuspicious,
      confidence: 0.85,
      patternKey: isSuspicious ? 'UNKNOWN' : 'SAFE_MESSAGE',
      patternNameEN: isSuspicious ? 'Suspicious Pattern' : 'Safe Message',
      patternNameHI: isSuspicious ? 'संदिग्ध पैटर्न' : 'सुरक्षित संदेश',
      headlineEN: isSuspicious ? 'Warning: Potential Scam Detected' : 'This message looks safe.',
      headlineHI: isSuspicious ? 'चेतावनी: संभावित घोटाले का पता चला' : 'यह संदेश सुरक्षित दिखता है।',
      explanationEN: isSuspicious
        ? 'This message contains common indicators of fraud or phishing. Do not share OTPs, PINs, or click unverified links.'
        : 'No obvious scam patterns detected. Always verify payment details before sending money.',
      explanationHI: isSuspicious
        ? 'इस संदेश में धोखाधड़ी या फ़िशिंग के सामान्य संकेत हैं। OTP, पिन साझा न करें या असत्यापित लिंक पर क्लिक न करें।'
        : 'कोई स्पष्ट घोटाला पैटर्न नहीं मिला। पैसे भेजने से पहले हमेशा भुगतान विवरण सत्यापित करें।'
    };
  }
}
