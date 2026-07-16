import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar'
import { NavbarActions } from '../navbar-actions/navbar-actions';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, NavbarActions, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
