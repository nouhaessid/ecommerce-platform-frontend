import { Component, computed, inject, input, effect } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { ProductInfo } from './product-info/product-info';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../layout/navbar/navbar';


@Component({
  selector: 'app-view-product-details',
  imports: [BackButton, ProductInfo, MatButton, RouterLink],
  templateUrl: './view-product-details.html',
  styleUrl: './view-product-details.scss',
})
export default class ViewProductDetails {

  productId = input.required<number, string>({
    transform: (value) => Number(value)
  });
  store = inject(EcommerceStore)

  constructor(){
    this.store.setProductId(this.productId)
  }

  backRoute = computed(() => `/products/${this.store.categoryName()}`)
}
