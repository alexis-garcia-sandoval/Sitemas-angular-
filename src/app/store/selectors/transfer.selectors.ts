import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TransferState } from '../reducers/transfer.reducer';

export const selectTransferState = createFeatureSelector<TransferState>('transfer');

export const selectPendingTransfer = createSelector(selectTransferState, s => s.pendingTransfer);
export const selectLastTransaction = createSelector(selectTransferState, s => s.lastTransaction);
export const selectTransferHistory = createSelector(selectTransferState, s => s.history);
export const selectTransferLoading = createSelector(selectTransferState, s => s.loading);
export const selectTransferError = createSelector(selectTransferState, s => s.error);
