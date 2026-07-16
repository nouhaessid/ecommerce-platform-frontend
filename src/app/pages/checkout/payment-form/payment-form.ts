import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ViewPanel } from '../../../directives/view-panel';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-payment-form',
  imports: [MatIcon, ViewPanel, MatFormField, MatInput, MatLabel, MatPrefix],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {}
