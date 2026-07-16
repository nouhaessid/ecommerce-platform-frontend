import { Component, computed, input } from '@angular/core';
import { UserReview } from '../../../models/user-review';
import { ViewPanel } from "../../../directives/view-panel";
import { StarRating } from '../../../components/star-rating/star-rating';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-review-item',
  imports: [ViewPanel, StarRating, DatePipe],
  templateUrl: './view-review-item.html',
  styleUrl: './view-review-item.scss',
})
export class ViewReviewItem {
  review = input.required<UserReview>();
}
