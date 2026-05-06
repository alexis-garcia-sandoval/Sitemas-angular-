import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction, TransferRequest } from '../models/transaction.model';

const MOCK_HISTORY: Transaction[] = [
  {
    id: '1',
    fromAccount: '1234567890',
    toAccount: '1111222233',
    amount: 2500,
    concept: 'Pago de renta',
    date: new Date('2026-04-15'),
    status: 'SUCCESS',
    folio: 'TRF-001',
  },
  {
    id: '2',
    fromAccount: '1234567890',
    toAccount: '4444555566',
    amount: 800,
    concept: 'Cena cumpleaños',
    date: new Date('2026-04-20'),
    status: 'SUCCESS',
    folio: 'TRF-002',
  },
  {
    id: '3',
    fromAccount: '0987654321',
    toAccount: '7777888899',
    amount: 5000,
    concept: 'Préstamo personal',
    date: new Date('2026-05-01'),
    status: 'PENDING',
    folio: 'TRF-003',
  },
];

@Injectable({ providedIn: 'root' })
export class TransferService {
  sendTransfer(request: TransferRequest): Observable<Transaction> {
    const newTransaction: Transaction = {
      id: String(Date.now()),
      fromAccount: request.fromAccountId,
      toAccount: request.toAccountNumber,
      amount: request.amount,
      concept: request.concept,
      date: new Date(),
      status: 'SUCCESS',
      folio: `TRF-${String(Date.now()).slice(-5)}`,
    };
    return of(newTransaction);
  }

  getHistory(): Observable<Transaction[]> {
    return of(MOCK_HISTORY);
  }

  getTransactionById(id: string): Observable<Transaction | undefined> {
    return of(MOCK_HISTORY.find(t => t.id === id));
  }
}
