// src/lib/feedbackApi.ts

export interface FeedbackPayload {
  verdictId: string;   // ScamPatternKey
  correct: boolean;
  timestamp: number;
  appVersion: string;
}

/**
 * Sends an anonymized opt-in feedback signal.
 * Zero message content is included — only the verdict ID and correctness flag.
 */
export async function sendFeedback(payload: FeedbackPayload): Promise<void> {
  try {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Silently ignore — feedback is optional and best-effort
  }
}
