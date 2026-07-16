import { Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  imports: [MatIcon],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {
  rating = input.required<number>();

  starArray = computed(() => {
    return Array(5)
          .fill(null)
          .map((_, index) => {
            if (this.rating() >= index + 1) 
              return 'full'

            if (this.rating() >= index + 0.5)
              return 'half'

            return 'empty'
          }) 
  })
}
