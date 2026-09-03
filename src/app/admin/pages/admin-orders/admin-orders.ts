import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrderApiService } from '../../../api/order-api.service';
import { OrderLineResponse, OrderResponse } from '../../../models/order-response';
import AdminOrderDetailsDialog from './admin-order-details-dialog/admin-order-details-dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-admin-orders',
  imports: [
    MatIconModule,
    MatButtonModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.scss',
})
export default class AdminOrders {

  orders = signal<OrderResponse[]>([]);
  orderLines = signal<OrderLineResponse[]>([]);
  
  orderApi = inject(OrderApiService);
  searchQuery = signal('');

  private dialog = inject(MatDialog);

  ngOnInit(): void {

    this.orderApi.getOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
      },
      error: (error) => {
        console.error('Failed to load orders:', error);
      }
    });
  }

  filteredOrders = computed(() => {

    const query = this.searchQuery().trim().toLowerCase();

    return this.orders().filter(order => {

      const matchesSearch =
        !query ||
        order.reference.toLowerCase().includes(query);

      return matchesSearch;
    });

  });

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  viewOrder(order: OrderResponse): void {
    this.dialog.open(AdminOrderDetailsDialog, {
      width: '600px',
      maxWidth: '95vw',
      data: {
        order
      }
    });
  }
}