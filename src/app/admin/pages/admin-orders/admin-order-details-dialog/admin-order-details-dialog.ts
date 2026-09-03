import { Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { OrderApiService } from '../../../../api/order-api.service';
import { OrderResponse } from '../../../../models/order-response';
import { OrderLineResponse } from '../../../../models/order-response';

import { EcommerceStore } from '../../../../ecommerce-store';

@Component({
  selector: 'app-admin-order-details-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './admin-order-details-dialog.html',
  styleUrl: './admin-order-details-dialog.scss',
})
export default class AdminOrderDetailsDialog {

  private orderApi = inject(OrderApiService);
  private store = inject(EcommerceStore);

  data = inject(MAT_DIALOG_DATA) as {
    order: OrderResponse;
  };

  order = this.data.order;

  orderLines = signal<OrderLineResponse[]>([]);

  ngOnInit(): void {

    this.orderApi.getOrderLines(this.order.id).subscribe({
      next: (orderLines) => {
        this.orderLines.set(orderLines);
      },
      error: (error) => {
        console.error('Failed to load order lines:', error);
      }
    });

  }

  getProduct(productId: number) {
    return this.store.products().find(
      product => product.id === productId
    );
  }

}