import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { QtySelector } from '../../components/qty-selector/qty-selector';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatIconButton, MatIcon, CurrencyPipe],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss',
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(EcommerceStore)

  total = computed(() => (this.item().product.price * this.item().quantity))
}
