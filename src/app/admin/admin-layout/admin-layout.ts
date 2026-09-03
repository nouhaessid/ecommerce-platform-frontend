import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbar } from './admin-navbar/admin-navbar';
import { AdminSidenav } from './admin-sidenav/admin-sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminSidenav, MatSidenavModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export default class AdminLayout {
  store = inject(EcommerceStore);
}
