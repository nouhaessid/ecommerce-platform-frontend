import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav'
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list'
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, ToggleWishlistButton],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})


export default class ProductsGrid {
  category = input<string>('all')

  store = inject(EcommerceStore);

  categories = signal<string[]>(['All', 'Electronics', 'Clothing', 'Home & Garden','Sports & Leisure'])

  constructor(){
    this.store.setCategory(this.category)
  }
}


