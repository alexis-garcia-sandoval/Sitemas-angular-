import { createAction, props } from '@ngrx/store';
import { Transaction, TransferRequest } from '../../core/models/transaction.model';

export const setPendingTransfer = createAction(
  '[Transfer] Set Pending',
  props<{ transfer: TransferRequest }>()
);

export const confirmTransfer = createAction('[Transfer] Confirm');

export const transferSuccess = createAction(
  '[Transfer] Success',
  props<{ transaction: Transaction }>()
);

export const transferFailure = createAction(
  '[Transfer] Failure',
  props<{ error: string }>()
);

export const loadHistory = createAction('[Transfer] Load History');

export const loadHistorySuccess = createAction(
  '[Transfer] Load History Success',
  props<{ transactions: Transaction[] }>()
);
