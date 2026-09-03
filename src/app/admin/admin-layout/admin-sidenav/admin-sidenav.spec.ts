import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidenav } from './admin-sidenav';

describe('AdminSidenav', () => {
  let component: AdminSidenav;
  let fixture: ComponentFixture<AdminSidenav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSidenav],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSidenav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
