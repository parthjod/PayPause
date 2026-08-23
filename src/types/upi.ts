// src/types/upi.ts

export interface UPIPayload {
  payeeAddress: string;
  payeeName: string;
  amount: string | null;
  transactionRef: string | null;
  direction: 'outgoing' | 'collect';
}
