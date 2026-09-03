import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [MatIcon, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  store = inject(EcommerceStore);

  private router = inject(Router);

  search(input: HTMLInputElement) {
    const query = input.value.trim();

    if (!query) {
      return;
    }

    if (this.router.url.startsWith('/products/')) {
      this.router.navigate(['/products', this.store.categoryName()], {
      queryParams: {
        search: query
      },
      queryParamsHandling: 'merge'
    });
    } else {
    this.router.navigate(['/products', 'all'], {
      queryParams: {
        search: query
      }
    });}
  }


  clearSearch(input: HTMLInputElement) {
    input.value = '';

    this.router.navigate(['/products', this.store.categoryName()], {
      queryParams: {
        search: null
      },
      queryParamsHandling: 'merge'
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.store.setSearchQuery(input.value);
  }
}
