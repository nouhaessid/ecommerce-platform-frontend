import { Component, computed, inject, input, effect } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav'
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list'
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { TitleCasePipe } from '@angular/common';
import { CategoryApiService } from '../../api/category-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, ToggleWishlistButton, TitleCasePipe],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})


export default class ProductsGrid {

  categoryName = input<string>('all')

  route = inject(ActivatedRoute)

  store = inject(EcommerceStore);
  
  categoryApiService = inject(CategoryApiService);

  categories = toSignal(
    this.categoryApiService.getCategories().pipe(
      map(categories => [
        { id: 0, name: 'all', description: 'All products' },
        ...categories
      ])
    ),
    { initialValue: [] }
  );

  constructor(){
    this.store.setCategory(this.categoryName);
    this.route.queryParamMap.subscribe(params => {
      this.store.setSearchQuery(params.get('search') ?? '');
    });
  }
}