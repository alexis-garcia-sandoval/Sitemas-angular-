import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from '../../core/models/account.model';
import { AccountService } from '../../core/services/account.service';
import { AppState } from '../../store/reducers';
import { selectCurrentUser } from '../../store/selectors/auth.selectors';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser);
  accounts: Account[] = [];

  constructor(
    private store: Store<AppState>,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.getMyAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
