import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartOptions } from 'chart.js';
import { Account } from '../../core/models/account.model';
import { Transaction } from '../../core/models/transaction.model';
import { AccountService } from '../../core/services/account.service';
import { TransferService } from '../../core/services/transfer.service';
import { AppState } from '../../store/reducers';
import { selectCurrentUser } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser);
  accounts: Account[] = [];
  recentTransactions: Transaction[] = [];

  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Transferencias recientes',
        font: { size: 14 },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
      },
    },
  };

  constructor(
    private store: Store<AppState>,
    private accountService: AccountService,
    private transferService: TransferService
  ) {}

  ngOnInit(): void {
    this.accountService.getMyAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });

    this.transferService.getHistory().subscribe(transactions => {
      this.recentTransactions = transactions.slice(0, 5);
      this.buildChart(transactions);
    });
  }

  get totalBalance(): number {
    return this.accounts.reduce((sum, a) => sum + a.balance, 0);
  }

  private buildChart(transactions: Transaction[]): void {
    this.barChartData = {
      labels: transactions.map(t => t.concept),
      datasets: [
        {
          data: transactions.map(t => t.amount),
          backgroundColor: [
            '#1a237e', '#283593', '#3949ab',
            '#5c6bc0', '#7986cb', '#9fa8da',
          ],
          borderRadius: 6,
        },
      ],
    };
  }
}
