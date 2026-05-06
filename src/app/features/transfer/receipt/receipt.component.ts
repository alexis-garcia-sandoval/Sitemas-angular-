import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../../core/models/transaction.model';
import { AppState } from '../../../store/reducers';
import { selectLastTransaction } from '../../../store/selectors/transfer.selectors';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent {
  transaction$: Observable<Transaction | null> = this.store.select(selectLastTransaction);

  constructor(private store: Store<AppState>) {}
}
