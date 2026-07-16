import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarActions } from './navbar-actions';

describe('NavbarActions', () => {
  let component: NavbarActions;
  let fixture: ComponentFixture<NavbarActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarActions],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
