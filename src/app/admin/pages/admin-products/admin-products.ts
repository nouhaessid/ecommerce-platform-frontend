import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductApiService } from '../../../api/product-api.service';
import { CategoryApiService } from '../../../api/category-api.service';
import { EcommerceStore } from '../../../ecommerce-store';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import { MatDialog } from '@angular/material/dialog';
import AdminProductForm from './admin-product-form/admin-product-form';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectChange } from '@angular/material/select';
import { Toaster } from '../../../services/toaster';
import AdminConfirmDialog from '../../components/admin-confirm-dialog/admin-confirm-dialog';

@Component({
  selector: 'app-admin-products',
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.scss',
})
export default class AdminProducts {

  store = inject(EcommerceStore);

  productApi = inject(ProductApiService);
  categoryApi = inject(CategoryApiService);
  dialog = inject(MatDialog);
  toaster = inject(Toaster);


  products: Product[] = [];
  categories: Category[] = [];

  ngOnInit(): void {

    this.categoryApi.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
      }
    });

  }

  addProduct():void {
    this.dialog.open(AdminProductForm, {
      width: '600px',
      maxWidth: '95vw',
      data: {
        categories: this.categories
      }
    })
  }

  editProduct(product: Product):void {
    this.dialog.open(AdminProductForm, {
      width: '600px',
      maxWidth: '95vw',
      data: {
        product,
        categories: this.categories
      } 
    })
  }

  deleteProduct(id: number):void {
    const dialogRef = this.dialog.open(AdminConfirmDialog, {
      width: '400px',
      maxWidth: '95vw',
      data: {
        title: 'Delete Product',
        message: 'Are you sure you want to delete this product?',
        confirmText: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if (!confirmed) {
          return;
        }
      
        this.productApi.deleteProduct(id).subscribe({
          next: () => {
            this.store.refreshProducts();
          this.toaster.success('Product deleted successfully');
          },
          error: (error) => {
            console.error('Failed to delete product:', error);
            this.toaster.error('Failed to delete product');
          }
        });
      }
    });
  }

  searchQuery = signal('');
  selectedCategoryId = signal<number>(0);

  filteredProducts = computed(() => {

    const query = this.searchQuery().trim().toLowerCase();
    const categoryId = this.selectedCategoryId();

    return this.store.products().filter(product => {

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      const matchesCategory =
        categoryId === 0 ||
        product.categoryId === categoryId;

      return matchesSearch && matchesCategory;
    });

  });

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }


  onCategoryChange(event: MatSelectChange): void {
    this.selectedCategoryId.set(event.value);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedCategoryId.set(0);
  }
}
