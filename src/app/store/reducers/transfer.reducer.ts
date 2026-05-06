import { createReducer, on } from '@ngrx/store';
import { Transaction, TransferRequest } from '../../core/models/transaction.model';
import * as TransferActions from '../actions/transfer.actions';

export interface TransferState {
  pendingTransfer: TransferRequest | null;
  lastTransaction: Transaction | null;
  history: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransferState = {
  pendingTransfer: null,
  lastTransaction: null,
  history: [],
  loading: false,
  error: null,
};

export const transferReducer = createReducer(
  initialState,
  on(TransferActions.setPendingTransfer, (state, { transfer }) => ({ ...state, pendingTransfer: transfer })),
  on(TransferActions.confirmTransfer, state => ({ ...state, loading: true, error: null })),
  on(TransferActions.transferSuccess, (state, { transaction }) => ({
    ...state,
    lastTransaction: transaction,
    pendingTransfer: null,
    loading: false,
  })),
  on(TransferActions.transferFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(TransferActions.loadHistorySuccess, (state, { transactions }) => ({ ...state, history: transactions }))
);
