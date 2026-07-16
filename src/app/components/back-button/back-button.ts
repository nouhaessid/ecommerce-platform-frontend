import { Component, input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-back-button',
  imports: [MatButton, RouterLink, MatIcon],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {

  navigateTo = input<string>()
}
