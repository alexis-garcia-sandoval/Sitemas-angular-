import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { Account } from '../../../core/models/account.model';
import { AccountService } from '../../../core/services/account.service';
import { AppState } from '../../../store/reducers';
import * as TransferActions from '../../../store/actions/transfer.actions';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  myAccounts: Account[] = [];
  searchResults: Account[] = [];
  isSearching = false;

  form = this.fb.group({
    fromAccountId: ['', Validators.required],
    toAccountNumber: ['', [Validators.required, Validators.minLength(10)]],
    amount: ['', [Validators.required, Validators.min(1), this.positiveNumberValidator]],
    concept: ['', [Validators.required, Validators.maxLength(100)]],
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getMyAccounts().subscribe(accounts => {
      this.myAccounts = accounts;
    });

    // RxJS debounce para búsqueda en tiempo real
    this.form.get('toAccountNumber')!.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query || query.length < 4) return [];
        this.isSearching = true;
        return this.accountService.searchAccount(query);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: results => {
        this.searchResults = results;
        this.isSearching = false;
      },
      error: () => { this.isSearching = false; }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectAccount(account: Account): void {
    this.form.patchValue({ toAccountNumber: account.accountNumber });
    this.searchResults = [];
  }

  getSelectedAccountBalance(): number {
    const id = this.form.get('fromAccountId')?.value;
    return this.myAccounts.find(a => a.id === id)?.balance ?? 0;
  }

  onContinue(): void {
    if (this.form.invalid) return;
    const amount = Number(this.form.value.amount);
    if (amount > this.getSelectedAccountBalance()) {
      this.form.get('amount')?.setErrors({ insufficientFunds: true });
      return;
    }
    this.store.dispatch(TransferActions.setPendingTransfer({
      transfer: {
        fromAccountId: this.form.value.fromAccountId!,
        toAccountNumber: this.form.value.toAccountNumber!,
        amount,
        concept: this.form.value.concept!,
      },
    }));
    this.router.navigate(['/transferencia/confirmacion']);
  }

  private positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = Number(control.value);
    return isNaN(value) || value <= 0 ? { invalidAmount: true } : null;
  }
}
