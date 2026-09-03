import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDetailsDialog } from './admin-order-details-dialog';

describe('AdminOrderDetailsDialog', () => {
  let component: AdminOrderDetailsDialog;
  let fixture: ComponentFixture<AdminOrderDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrderDetailsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOrderDetailsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
