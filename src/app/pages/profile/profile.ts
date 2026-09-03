import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service';
import { EcommerceStore } from '../../ecommerce-store';
import { CustomerApiService } from '../../api/customer-api.service';
import { Toaster } from '../../services/toaster';
import { loadCustomerId } from '../../storage/storage-sync';

@Component({
  selector: 'app-profile',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export default class Profile {

  store = inject(EcommerceStore);
  authService = inject(AuthService);
  customerApi = inject(CustomerApiService);
  toaster = inject(Toaster);

  currentProfileImage = signal<string | null>(null);
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  ngOnInit(): void {
    const customerId = loadCustomerId();
    
    if (!customerId) {
      return;
    }
  
    this.customerApi.getProfileImage(customerId).subscribe({
      next: (imageBlob) => {
      const imageUrl = URL.createObjectURL(imageBlob);
      this.currentProfileImage.set(imageUrl);
      
    },
      error: (error) => {
        if (error.status !== 404) {
          console.error('Failed to load profile image:', error);
        }
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files || input.files.length === 0) {
      return;
    }
  
    const file = input.files[0];
  
    if (!file.type.startsWith('image/')) {
      this.toaster.error('Please select a valid image');
      return;
    }
  
    this.selectedImage = file;
  
    // Create an immediate preview
    this.imagePreview = URL.createObjectURL(file);
  }

  saveProfile(): void {

    if (!this.selectedImage) {
      return;
    } 

    const customerId = this.store.customerId(); 

    if (!customerId) {
      this.toaster.error('Customer information is not available');
      return;
    } 

    this.store.setLoading(true);

    this.customerApi.uploadProfileImage(customerId, this.selectedImage).subscribe({
      next: () => {
        this.store.setProfileImageUrl(this.imagePreview ?? undefined);
        this.store.setLoading(false);
        this.toaster.success('Profile picture updated successfully');
        window.history.back();
      },
      error: (error) => {
        this.store.setLoading(false);
        this.toaster.error('Failed to update profile picture');
        console.error('Failed to upload profile image:', error);
      }
    });
  }

  cancel(): void {
    this.selectedImage = null;
    this.imagePreview = null;

    window.history.back();
  }

}