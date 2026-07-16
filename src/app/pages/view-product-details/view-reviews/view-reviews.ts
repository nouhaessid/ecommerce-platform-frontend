import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { ViewPanel } from "../../../directives/view-panel";
import { RatingSummary } from '../../../view-product-details/rating-summary/rating-summary';
import { ViewReviewItem } from '../view-review-item/view-review-item';
import { MatButton } from "@angular/material/button";
import { WriteReview } from '../write-review/write-review';
import { EcommerceStore } from '../../../ecommerce-store';

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummary, ViewReviewItem, MatButton, WriteReview],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.scss',
})
export class ViewReviews {
  store = inject(EcommerceStore)
  product = input.required<Product>()
  sortedReviews = computed(() =>{
    return [...this.product().reviews].sort((a,b) => b.reviewDate.getTime() - a.reviewDate.getTime())
  })

}
