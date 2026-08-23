// src/lib/classifier.ts
// NOTE: This file is ONLY imported by src/workers/nlp.worker.ts.
// Component code uses the useNLPWorker hook instead.

import type { ScamPatternKey } from '../types/verdict';

// Resolve model path correctly whether this runs in a Worker or main thread.
// In a Worker, `self.location.href` points to the worker script's URL;
// prepending '/' gives us the app root.
const MODEL_URL = new URL('/models/scam_classifier.onnx', self.location.href).href;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let session: any = null;
let modelAvailable = false;

export async function loadModel(): Promise<void> {
  try {
    // Dynamic import to avoid bundling ort into non-worker chunks
    const ort = await import('onnxruntime-web');
    session = await ort.InferenceSession.create(MODEL_URL, {
      executionProviders: ['wasm'],
    });
    modelAvailable = true;
  } catch {
    // Model file absent (404) or WASM unavailable — graceful degradation
    modelAvailable = false;
  }
}

export interface ClassifierResult {
  isScam: boolean;
  confidence: number;
  patternKey: ScamPatternKey;
}

/**
 * Runs ONNX inference on a pre-tokenized Float32Array.
 * Falls back to a demo/placeholder result when the model is unavailable.
 */
export async function classifyRaw(input: Float32Array): Promise<ClassifierResult> {
  if (!modelAvailable || !session) {
    // Demo mode — model not loaded
    return { isScam: false, confidence: 0, patternKey: 'UNKNOWN' };
  }

  try {
    const ort = await import('onnxruntime-web');
    const inputTensor = new ort.Tensor('float32', input, [1, input.length]);
    const feeds: Record<string, unknown> = { input_ids: inputTensor };
    const results = await (session as { run: (f: Record<string, unknown>) => Promise<Record<string, { data: Float32Array }>> }).run(feeds);
    return parseOutput(results);
  } catch {
    return { isScam: false, confidence: 0, patternKey: 'UNKNOWN' };
  }
}

function parseOutput(
  results: Record<string, { data: Float32Array }>,
): ClassifierResult {
  // Expected output: logits tensor shaped [1, NUM_CLASSES]
  // Classes order: [SAFE, FAKE_REFUND_QR, KYC_PHISHING, OTP_SOCIAL_ENGINEERING,
  //                 FAKE_PAYMENT_SCREENSHOT, CUSTOMER_CARE_IMPERSONATION]
  const PATTERN_KEYS: ScamPatternKey[] = [
    'UNKNOWN',
    'FAKE_REFUND_QR',
    'KYC_PHISHING',
    'OTP_SOCIAL_ENGINEERING',
    'FAKE_PAYMENT_SCREENSHOT',
    'CUSTOMER_CARE_IMPERSONATION',
  ];

  const logits = Object.values(results)[0]?.data;
  if (!logits || logits.length === 0) {
    return { isScam: false, confidence: 0, patternKey: 'UNKNOWN' };
  }

  // Softmax
  const maxLogit = Math.max(...logits);
  const exps = Array.from(logits).map(l => Math.exp(l - maxLogit));
  const sum = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map(e => e / sum);

  // Index 0 = SAFE class
  const safeProb = probs[0] ?? 0;
  const isScam = safeProb < 0.5;

  const scamProbs = probs.slice(1);
  const maxScamIdx = scamProbs.indexOf(Math.max(...scamProbs));
  const patternKey: ScamPatternKey =
    isScam ? (PATTERN_KEYS[maxScamIdx + 1] ?? 'UNKNOWN') : 'UNKNOWN';
  const confidence = isScam ? (1 - safeProb) : safeProb;

  return { isScam, confidence, patternKey };
}
