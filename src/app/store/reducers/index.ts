import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth.reducer';
import { transferReducer, TransferState } from './transfer.reducer';

export interface AppState {
  auth: AuthState;
  transfer: TransferState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  transfer: transferReducer,
};
