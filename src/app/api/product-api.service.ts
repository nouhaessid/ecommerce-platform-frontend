import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Observable, map } from 'rxjs';
import { ProductRequest } from '../models/product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/api/v1/products`;

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products =>
        products.map(product => ({
          ...product,
          inStock: product.availableQuantity > 0
        }))
      )
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      map(product => ({
        ...product,
        inStock: product.availableQuantity > 0
      }))
    );
  }

  createProduct(product: ProductRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, product);
  }

  updateProduct(id: number, product: ProductRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}