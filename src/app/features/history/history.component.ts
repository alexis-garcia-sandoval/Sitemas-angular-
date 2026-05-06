import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged, takeUntil, Subject } from 'rxjs';
import { Transaction } from '../../core/models/transaction.model';
import { AppState } from '../../store/reducers';
import { selectTransferHistory } from '../../store/selectors/transfer.selectors';
import * as TransferActions from '../../store/actions/transfer.actions';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  private destroy$ = new Subject<void>();

  displayedColumns = ['date', 'concept', 'toAccount', 'amount', 'status'];
  transactions$: Observable<Transaction[]> = this.store.select(selectTransferHistory);

  filters = this.fb.group({
    fromDate: [''],
    toDate: [''],
  });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.dispatch(TransferActions.loadHistory());

    this.filters.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.store.dispatch(TransferActions.loadHistory());
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      SUCCESS: 'primary',
      PENDING: 'accent',
      FAILED: 'warn',
    };
    return colors[status] ?? 'default';
  }
}
