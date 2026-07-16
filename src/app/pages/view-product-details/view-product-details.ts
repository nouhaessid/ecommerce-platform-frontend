import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { ProductInfo } from './product-info/product-info';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ViewReviews } from './view-reviews/view-reviews';

@Component({
  selector: 'app-view-product-details',
  imports: [BackButton, ProductInfo, MatButton, RouterLink, ViewReviews],
  templateUrl: './view-product-details.html',
  styleUrl: './view-product-details.scss',
})
export default class ViewProductDetails {

  productId = input.required<string>()
  store = inject(EcommerceStore)

  constructor(){
    this.store.setProductId(this.productId)
  }
  //selectedProduct = computed(() => this.store.products().find((p) => p.id === this.productId())
  //)

  backRoute = computed(() => `/products/${this.store.category()}`)
}
