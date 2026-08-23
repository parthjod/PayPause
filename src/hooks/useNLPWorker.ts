// src/hooks/useNLPWorker.ts
// Interfaces with Gemini 2.5 Flash API for real-time intelligent scam classification

import { useState, useCallback } from 'react';
import type { VerdictResult } from '../types/verdict';
import { classifyWithGemini } from '../lib/geminiClassifier';

export interface UseNLPWorker {
  classify: (text: string) => Promise<VerdictResult>;
  loading: boolean;
  modelReady: boolean;
}

export function useNLPWorker(): UseNLPWorker {
  const [loading, setLoading] = useState(false);

  const classify = useCallback(async (text: string): Promise<VerdictResult> => {
    setLoading(true);
    try {
      const result = await classifyWithGemini(text);
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  return { classify, loading, modelReady: true };
}
