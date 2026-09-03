import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../ecommerce-store';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, CurrencyPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input.required<Product>()
  store = inject(EcommerceStore)

}
