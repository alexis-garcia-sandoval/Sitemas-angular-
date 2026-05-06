import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../models/account.model';

const MOCK_ACCOUNTS: Account[] = [
  { id: '1', accountNumber: '1234567890', ownerName: 'Alexis García', balance: 45000, currency: 'MXN' },
  { id: '2', accountNumber: '0987654321', ownerName: 'Alexis García', balance: 12500, currency: 'MXN' },
];

const MOCK_ALL_ACCOUNTS: Account[] = [
  ...MOCK_ACCOUNTS,
  { id: '3', accountNumber: '1111222233', ownerName: 'Juan Pérez', balance: 0, currency: 'MXN' },
  { id: '4', accountNumber: '4444555566', ownerName: 'María López', balance: 0, currency: 'MXN' },
  { id: '5', accountNumber: '7777888899', ownerName: 'Carlos Ruiz', balance: 0, currency: 'MXN' },
];

@Injectable({ providedIn: 'root' })
export class AccountService {
  getMyAccounts(): Observable<Account[]> {
    return of(MOCK_ACCOUNTS);
  }

  searchAccount(query: string): Observable<Account[]> {
    const q = query.toLowerCase();
    const results = MOCK_ALL_ACCOUNTS.filter(
      a =>
        a.accountNumber.includes(q) ||
        a.ownerName.toLowerCase().includes(q)
    );
    return of(results);
  }
}
