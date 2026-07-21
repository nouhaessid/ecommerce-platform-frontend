import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav'
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list'
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, ToggleWishlistButton, TitleCasePipe],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})


export default class ProductsGrid {
  category = input<string>('all')

  route = inject(ActivatedRoute)

  store = inject(EcommerceStore);

  categories = signal<string[]>(['all', 'electronics', 'clothing', 'home','sports'])

  constructor(){
    this.store.setCategory(this.category)
    this.route.queryParamMap.subscribe(params => {
      this.store.setSearchQuery(
          params.get('search') ?? ''
      );
    });
  }

  
  
}


