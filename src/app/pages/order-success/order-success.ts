import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-order-success',
  imports: [MatButton, MatIcon, RouterLink],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export default class OrderSuccess {}
