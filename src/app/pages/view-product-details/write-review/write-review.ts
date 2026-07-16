import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { EcommerceStore } from '../../../ecommerce-store';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionItem } from '../../../models/option-item';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { AddReviewParams } from '../../../models/user-review';

@Component({
  selector: 'app-write-review',
  imports: [ViewPanel, MatInput, MatFormField, MatLabel, ReactiveFormsModule, MatOption, MatSelect, MatButton],
  templateUrl: './write-review.html',
  styleUrl: './write-review.scss',
  host:{
    class: 'block'
  }
})
export class WriteReview {

  store = inject(EcommerceStore)

  ratingOptions = signal<OptionItem[]>([
    { label: '5 Stars - Excellent', value: 5 },
    { label: '4 Stars - Good', value: 4 },
    { label: '3 Stars - Average', value: 3 },
    { label: '2 Stars - Poor', value: 2 },
    { label: '1 Star - Terrible', value: 1 },
  ])

  fb = inject(NonNullableFormBuilder)
  reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: [5, Validators.required]
  })

  saveReview() {
    if (!this.reviewForm.valid){
      this.reviewForm.markAllAsTouched();
      return
    }
    const {title, comment, rating} = this.reviewForm.value
    this.store.addReview({title, comment, rating} as AddReviewParams)
  }
}
