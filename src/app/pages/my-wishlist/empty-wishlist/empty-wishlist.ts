import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatIcon, RouterLink, MatButton],
  templateUrl: './empty-wishlist.html',
  styleUrl: './empty-wishlist.scss',
})
export class EmptyWishlist {}
