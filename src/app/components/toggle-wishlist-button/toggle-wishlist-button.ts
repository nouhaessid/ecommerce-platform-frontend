import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../models/product';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button'

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon, MatIconButton],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {
  store = inject(EcommerceStore)
  
  product = input.required<Product>()

  isInWhishlist = computed(() => this.store.wishlistItems().find(p => p.id === this.product().id))

  toggleWishlist(product: Product){
    if (this.isInWhishlist()){
      this.store.removeFromWishlist(product)
    }
    else{
      this.store.addToWishlist(product)
    }
      
  }
}
