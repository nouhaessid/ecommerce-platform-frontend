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

export function saveUser(user: EcommerceState['user']) {
  if (!isBrowser) return;

  if (user) {
    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );
  } else {
    localStorage.removeItem('user');
  }
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


export function loadUser(): EcommerceState['user'] {
  if (!isBrowser) return undefined;

  const data = localStorage.getItem('user');

  return data ? JSON.parse(data) : undefined;
}