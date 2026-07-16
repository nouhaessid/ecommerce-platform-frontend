import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockStatus } from './stock-status';

describe('StockStatus', () => {
  let component: StockStatus;
  let fixture: ComponentFixture<StockStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(StockStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
