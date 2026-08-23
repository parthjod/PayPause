// src/lib/languageDetect.ts

export type DetectedLanguage = 'en' | 'hi' | 'hinglish';

// Unicode ranges for Devanagari script (Hindi)
const DEVANAGARI_RE = /[\u0900-\u097F]/;
// Basic Latin letters
const LATIN_RE = /[a-zA-Z]/;

/**
 * Detects whether the input text is primarily:
 * - 'hi'       — mostly Devanagari
 * - 'hinglish' — a mix of Devanagari + Latin
 * - 'en'       — primarily Latin / no Devanagari
 */
export function detectLanguage(text: string): DetectedLanguage {
  const hasDevanagari = DEVANAGARI_RE.test(text);
  const hasLatin = LATIN_RE.test(text);

  if (hasDevanagari && hasLatin) return 'hinglish';
  if (hasDevanagari) return 'hi';
  return 'en';
}

/**
 * Minimal normalization pass:
 * - Collapses whitespace
 * - Strips URLs (they are a signal for the classifier, not content)
 * - Lowercases Latin characters
 * For Hinglish/Hindi, we preserve the original script and casing.
 */
export function normalize(text: string, lang: DetectedLanguage): string {
  let out = text.trim();
  // Replace URLs with a placeholder token so the model sees the signal
  out = out.replace(/https?:\/\/\S+/gi, '[URL]');
  if (lang === 'en') {
    out = out.toLowerCase();
  }
  // Collapse multiple whitespace
  out = out.replace(/\s+/g, ' ');
  return out;
}
