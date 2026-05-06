import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ReceiptComponent } from './receipt/receipt.component';

const routes: Routes = [
  { path: '', component: TransferFormComponent },
  { path: 'confirmacion', component: ConfirmationComponent },
  { path: 'comprobante', component: ReceiptComponent },
];

@NgModule({
  declarations: [TransferFormComponent, ConfirmationComponent, ReceiptComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class TransferModule {}
