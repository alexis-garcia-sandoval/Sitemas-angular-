import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TransferRequest } from '../../../core/models/transaction.model';
import { AppState } from '../../../store/reducers';
import { selectPendingTransfer, selectTransferLoading, selectTransferError } from '../../../store/selectors/transfer.selectors';
import * as TransferActions from '../../../store/actions/transfer.actions';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  transfer$: Observable<TransferRequest | null> = this.store.select(selectPendingTransfer);
  loading$: Observable<boolean> = this.store.select(selectTransferLoading);
  error$: Observable<string | null> = this.store.select(selectTransferError);

  constructor(private store: Store<AppState>) {}

  confirm(): void {
    this.store.dispatch(TransferActions.confirmTransfer());
  }
}
