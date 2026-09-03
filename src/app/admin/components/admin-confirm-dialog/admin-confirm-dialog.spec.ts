import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfirmDialog } from './admin-confirm-dialog';

describe('AdminConfirmDialog', () => {
  let component: AdminConfirmDialog;
  let fixture: ComponentFixture<AdminConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConfirmDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminConfirmDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
