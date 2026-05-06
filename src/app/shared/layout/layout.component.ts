import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import { AppState } from '../../store/reducers';
import { selectCurrentUser } from '../../store/selectors/auth.selectors';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  user$: Observable<User | null> = this.store.select(selectCurrentUser);

  navItems = [
    { label: 'Dashboard',          icon: 'dashboard',      route: '/dashboard' },
    { label: 'Nueva Transferencia', icon: 'send',           route: '/transferencia' },
    { label: 'Historial',           icon: 'receipt_long',   route: '/historial' },
  ];

  constructor(private store: Store<AppState>) {}

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
