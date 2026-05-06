import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { TransferService } from '../../core/services/transfer.service';
import * as TransferActions from '../actions/transfer.actions';
import { selectPendingTransfer } from '../selectors/transfer.selectors';
import { AppState } from '../reducers';

@Injectable()
export class TransferEffects {
  confirmTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferActions.confirmTransfer),
      withLatestFrom(this.store.select(selectPendingTransfer)),
      switchMap(([, transfer]) => {
        if (!transfer) return of(TransferActions.transferFailure({ error: 'No hay transferencia pendiente' }));
        return this.transferService.sendTransfer(transfer).pipe(
          map(transaction => TransferActions.transferSuccess({ transaction })),
          catchError(err => of(TransferActions.transferFailure({ error: err.message })))
        );
      })
    )
  );

  transferSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransferActions.transferSuccess),
        tap(() => this.router.navigate(['/transferencia/comprobante']))
      ),
    { dispatch: false }
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferActions.loadHistory),
      switchMap(() =>
        this.transferService.getHistory().pipe(
          map(transactions => TransferActions.loadHistorySuccess({ transactions })),
          catchError(() => of(TransferActions.loadHistorySuccess({ transactions: [] })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private transferService: TransferService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
