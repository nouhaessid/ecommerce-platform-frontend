import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../../ecommerce-store';

@Component({
  selector: 'app-admin-navbar',
  imports: [MatToolbar, MatButton, RouterLink, MatIcon, MatIconButton],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.scss',
})
export class AdminNavbar {
  store = inject(EcommerceStore);
}
