import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OrderRequest } from '../models/order-request';
import { Observable } from 'rxjs';
import { OrderLineResponse, OrderResponse } from '../models/order-response';

@Injectable({
  providedIn: 'root'
})

export class OrderApiService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/api/v1/orders`;

  createOrder(order: OrderRequest) {
    return this.http.post<number>(this.apiUrl, order);
  }

  getOrders():Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.apiUrl);
  }

  getOrderLines(orderId: number): Observable<OrderLineResponse[]> {
  return this.http.get<OrderLineResponse[]>(
    `${environment.apiUrl}/api/v1/order-lines/order/${orderId}`
  );
}
}