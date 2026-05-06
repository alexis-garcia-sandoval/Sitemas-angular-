export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface Transaction {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  concept: string;
  date: Date;
  status: TransactionStatus;
  folio: string;
}

export interface TransferRequest {
  fromAccountId: string;
  toAccountNumber: string;
  amount: number;
  concept: string;
}
