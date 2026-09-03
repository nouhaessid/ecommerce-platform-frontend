import { Component, inject } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { EcommerceStore } from '../../../ecommerce-store';
import { ShowCartItem } from '../show-cart-item/show-cart-item';

@Component({
  selector: 'app-list-cart-items',
  imports: [ViewPanel, ShowCartItem],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.scss',
})
export class ListCartItems {
  store = inject(EcommerceStore)
}
