import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviewItem } from './view-review-item';

describe('ViewReviewItem', () => {
  let component: ViewReviewItem;
  let fixture: ComponentFixture<ViewReviewItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReviewItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewReviewItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
