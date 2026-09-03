import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { AdminNavbar } from './admin/admin-layout/admin-navbar/admin-navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, AdminNavbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecommerce');
  router = inject(Router);
}
