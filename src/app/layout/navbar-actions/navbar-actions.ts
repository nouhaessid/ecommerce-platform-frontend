import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatBadge } from '@angular/material/badge'
import { RouterLink } from "@angular/router";
import { EcommerceStore } from '../../ecommerce-store';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatDivider } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-navbar-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge, MatMenu, MatMenuItem, MatMenuTrigger, MatDivider],
  templateUrl: './navbar-actions.html',
  styleUrl: './navbar-actions.scss',
})
export class NavbarActions {

  store = inject(EcommerceStore)

  matDialog = inject(MatDialog)

  openSignInDialog(){
    this.matDialog.open(SignInDialog,{
      disableClose: true
    })
  }

  openSignUpDialog(){
    this.matDialog.open(SignUpDialog,{
      disableClose: true
    })
  }
  
}
