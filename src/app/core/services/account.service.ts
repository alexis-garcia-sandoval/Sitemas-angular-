import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {}

  getMyAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiUrl}/accounts/me`);
  }

  searchAccount(query: string): Observable<Account[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Account[]>(`${environment.apiUrl}/accounts/search`, { params });
  }
}
