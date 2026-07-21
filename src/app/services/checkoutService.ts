import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  fb = inject(NonNullableFormBuilder);

  shippingForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    streetAddress: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    country: ['', Validators.required],
  });

  paymentForm = this.fb.group({
    cardNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{16}$/)
      ]
    ],
    cardholderName: [
      '',
      Validators.required
    ],
    expiryDate: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
      ]
    ],
    cvv: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{3,4}$/)
      ]
    ]
  });
}