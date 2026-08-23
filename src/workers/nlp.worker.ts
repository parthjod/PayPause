// src/workers/nlp.worker.ts
// Owns the full NLP pipeline: language detect → normalize → tokenize → classify.
// classifier.ts is ONLY imported here, never in component code.

import { loadModel, classifyRaw } from '../lib/classifier';
import { detectLanguage, normalize } from '../lib/languageDetect';
import { buildVerdictResult } from '../types/scamPattern';
import type { VerdictResult } from '../types/verdict';

interface WorkerRequest {
  id: string;
  text: string;
}

interface WorkerResponse {
  id: string;
  verdict: VerdictResult;
  modelReady: boolean;
}

// Start loading the model as soon as the worker is created
let modelReady = false;
loadModel().then(() => {
  modelReady = true;
});

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const { id, text } = e.data;

  const lang = detectLanguage(text);
  const normalizedText = normalize(text, lang);

  // Minimal tokenization: encode as char code floats for now.
  // In production this would be replaced with a proper BPE tokenizer.
  const encoded = new Float32Array(
    Array.from(normalizedText.slice(0, 512)).map(c => c.charCodeAt(0) / 65535),
  );

  const raw = await classifyRaw(encoded);
  const verdict = buildVerdictResult(raw.isScam, raw.confidence, raw.patternKey);

  const response: WorkerResponse = { id, verdict, modelReady };
  self.postMessage(response);
};
