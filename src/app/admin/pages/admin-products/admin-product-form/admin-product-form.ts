import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../../models/category';
import { Product } from '../../../../models/product';
import { MatSelectModule } from '@angular/material/select';
import { ProductApiService } from '../../../../api/product-api.service';
import { AuthService } from '../../../../auth/auth.service';
import { ProductRequest } from '../../../../models/product-request';
import { EcommerceStore } from '../../../../ecommerce-store';
import { Toaster } from '../../../../services/toaster';

@Component({
  selector: 'app-admin-product-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './admin-product-form.html',
  styleUrl: './admin-product-form.scss',
})
export default class AdminProductForm {


  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<AdminProductForm>);
  toaster = inject(Toaster);
  productApi = inject(ProductApiService);
  authService = inject(AuthService);
  store = inject(EcommerceStore);

  data = inject(MAT_DIALOG_DATA) as {
    product?: Product;
    categories: Category[];
  };

  product = this.data.product;
  categories = this.data.categories;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    availableQuantity: [0, [Validators.required, Validators.min(0)]],
    categoryId: [null as number | null, Validators.required],
    imageUrl: ['', Validators.required]
  });

  get isEditMode(): boolean {
    return !!this.product;
  }

  submit(): void {

    if (!this.authService.isAdmin()) {
      console.log('User is not admin');
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: ProductRequest = this.form.getRawValue() as ProductRequest;

    if (this.product) {
      this.productApi.updateProduct(this.product.id, request).subscribe({
        next: () => {
          this.store.refreshProducts();
          this.toaster.success('Product updated successfully');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Failed to update product:', error);
          this.toaster.error('Failed to update product');
        }
      });
    } else {
      this.productApi.createProduct(request).subscribe({
        next: (productId) => {
          this.store.refreshProducts();
          this.toaster.success('Product created successfully');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Failed to create product:', error);
          this.toaster.error('Failed to create product');
        }
      });
    }    
  }

  constructor() {
    if (this.product) {
      this.form.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        availableQuantity: this.product.availableQuantity,
        categoryId: this.product.categoryId,
        imageUrl: this.product.imageUrl
      });
    }
  }

}