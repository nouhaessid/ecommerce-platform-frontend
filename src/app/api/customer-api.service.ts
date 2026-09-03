import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/api/v1/customers`;

  createCustomerIfNotExists() {
    return this.http.post(`${this.apiUrl}/me`, {}, { responseType: 'text' });
  }

  uploadProfileImage(customerId: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    
    return this.http.put(`${this.apiUrl}/${customerId}/profile-image`, formData);
  }
  
  getProfileImage(customerId: string) {
    return this.http.get(`${this.apiUrl}/${customerId}/profile-image`,
      {
        responseType: 'blob'
      }
    );
  }
}