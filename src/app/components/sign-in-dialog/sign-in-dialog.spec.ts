import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInDialog } from './sign-in-dialog';

describe('SignInDialog', () => {
  let component: SignInDialog;
  let fixture: ComponentFixture<SignInDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
