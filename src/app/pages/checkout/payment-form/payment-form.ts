import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ViewPanel } from '../../../directives/view-panel';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../../services/checkoutService';

@Component({
  selector: 'app-payment-form',
  imports: [MatIcon, ViewPanel, MatFormField, MatInput, MatLabel, MatPrefix, MatError, ReactiveFormsModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {

  fb = inject(NonNullableFormBuilder)
  checkout = inject(CheckoutService);

  paymentForm = this.checkout.paymentForm;
}
