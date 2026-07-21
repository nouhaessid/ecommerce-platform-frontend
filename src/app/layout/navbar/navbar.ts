import { Component, inject } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar'
import { NavbarActions } from '../navbar-actions/navbar-actions';
import { RouterLink } from "@angular/router";
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SearchBar } from '../search-bar/search-bar';


@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, NavbarActions, RouterLink, MatIconButton, MatIcon , SearchBar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  store = inject(EcommerceStore)
  
}
