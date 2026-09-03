import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatBadge } from '@angular/material/badge'
import { RouterLink } from "@angular/router";
import { EcommerceStore } from '../../ecommerce-store';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatDivider } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { TitleCasePipe } from '@angular/common';
import { CustomerApiService } from '../../api/customer-api.service';

@Component({
  selector: 'app-navbar-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge, MatMenu, MatMenuItem, MatMenuTrigger, MatDivider, TitleCasePipe],
  templateUrl: './navbar-actions.html',
  styleUrl: './navbar-actions.scss',
})
export class NavbarActions {

  store = inject(EcommerceStore);

  matDialog = inject(MatDialog);
  authService = inject(AuthService);
  customerApi = inject(CustomerApiService);

  signUp(): void {
    this.authService.register();
  }

  logout(): void {
    this.authService.logout();
  }
}