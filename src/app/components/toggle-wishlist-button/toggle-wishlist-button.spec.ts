import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleWishlistButton } from './toggle-wishlist-button';

describe('ToggleWishlistButton', () => {
  let component: ToggleWishlistButton;
  let fixture: ComponentFixture<ToggleWishlistButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleWishlistButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleWishlistButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
