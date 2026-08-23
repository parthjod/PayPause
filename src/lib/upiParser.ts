// src/lib/upiParser.ts

import type { UPIPayload } from '../types/upi';

/**
 * Parses a UPI deep link string into a structured UPIPayload.
 * Handles both `upi://pay?...` and raw query strings.
 */
export function parseUPILink(raw: string): UPIPayload {
  // Normalize upi:// scheme so URL can parse it
  const normalized = raw.startsWith('upi://')
    ? raw.replace('upi://', 'https://upi/')
    : `https://upi/pay?${raw}`;

  let params: URLSearchParams;
  try {
    params = new URL(normalized).searchParams;
  } catch {
    params = new URLSearchParams(raw);
  }

  const am = params.get('am');
  return {
    payeeAddress: params.get('pa') ?? '',
    payeeName: params.get('pn') ?? '',
    amount: am,
    transactionRef: params.get('tr'),
    // If amount is present, it's a pay (outgoing) request.
    // A collect request has no amount in the initiating URI.
    direction: am !== null && am !== '' ? 'outgoing' : 'collect',
  };
}
