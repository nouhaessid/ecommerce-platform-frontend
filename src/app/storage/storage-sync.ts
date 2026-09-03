import { EcommerceState } from '../ecommerce-store';

const isBrowser = typeof window !== 'undefined';

export function saveCart(cartItems: EcommerceState['cartItems']) {
  if (!isBrowser) return;

  localStorage.setItem(
    'cart',
    JSON.stringify(cartItems)
  );
}

export function saveWishlist(wishlistItems: EcommerceState['wishlistItems']) {
  if (!isBrowser) return;

  localStorage.setItem(
    'wishlist',
    JSON.stringify(wishlistItems)
  );
}


export function saveCustomerId(customerId: string): void {
  if (!isBrowser) return;
  localStorage.setItem('customerId', customerId);
}


export function loadCart(): EcommerceState['cartItems'] {
  if (!isBrowser) return [];

  const data = localStorage.getItem('cart');

  return data ? JSON.parse(data) : [];
}


export function loadWishlist(): EcommerceState['wishlistItems'] {
  if (!isBrowser) return [];

  const data = localStorage.getItem('wishlist');

  return data ? JSON.parse(data) : [];
}


export function loadCustomerId(): string | undefined  {
  if (!isBrowser) return undefined;
  return localStorage.getItem('customerId') ?? undefined;
}

