import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidenav',
  imports: [RouterLink, RouterLinkActive, MatIcon, MatListModule],
  templateUrl: './admin-sidenav.html',
  styleUrl: './admin-sidenav.scss',
})
export class AdminSidenav {}
