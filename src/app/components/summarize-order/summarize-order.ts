import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../ecommerce-store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel, CurrencyPipe],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {

  store = inject(EcommerceStore)
  subtotal = computed(() =>
      this.store.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0))

  tax = computed(() => 0.05 * this.subtotal())
  total = computed(() => this.subtotal() + this.tax())
}
