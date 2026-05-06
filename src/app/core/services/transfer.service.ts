import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransferRequest } from '../models/transaction.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TransferService {
  constructor(private http: HttpClient) {}

  sendTransfer(request: TransferRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${environment.apiUrl}/transfers`, request);
  }

  getHistory(page = 1, limit = 10, fromDate?: string, toDate?: string): Observable<Transaction[]> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (fromDate) params = params.set('fromDate', fromDate);
    if (toDate) params = params.set('toDate', toDate);

    return this.http.get<Transaction[]>(`${environment.apiUrl}/transfers/history`, { params });
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${environment.apiUrl}/transfers/${id}`);
  }
}
