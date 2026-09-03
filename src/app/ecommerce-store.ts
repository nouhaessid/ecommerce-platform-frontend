import { computed, inject } from "@angular/core";
import { Product } from "./models/product";
import { OrderRequest } from "./models/order-request";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { produce } from "immer"
import { Toaster } from "./services/toaster";
import { CartItem } from "./models/cart-item";
import { Router } from "@angular/router";
import { withStorageSync} from "@angular-architects/ngrx-toolkit";
import { loadCart, loadCustomerId, loadWishlist, saveCustomerId, saveCart, saveWishlist } from './storage/storage-sync';
import { effect } from '@angular/core';
import { ProductApiService } from './api/product-api.service';
import { AuthService } from './auth/auth.service';
import { OrderApiService } from "./api/order-api.service";
import { CustomerApiService } from "./api/customer-api.service";


export type EcommerceState= {
    products: Product[];
    categoryName: string;
    wishlistItems: Product[];
    cartItems: CartItem[];
    customerId: string | undefined;
    loading: boolean;
    selectedProductId: number | undefined;
    sidenavOpen: boolean;
    searchQuery: string;
    profileImageUrl: string | undefined;
}

export const EcommerceStore = signalStore(
    {
        providedIn: 'root'
    },
    withState({
        products: [],
        categoryName: 'all',
        wishlistItems: [],
        cartItems: [],
        customerId: undefined,
        loading: false,
        selectedProductId: undefined,
        sidenavOpen: true, 
        searchQuery: '',
        profileImageUrl: undefined
    } as EcommerceState),

    withHooks({
      onInit(store, productApiService = inject(ProductApiService), toaster = inject(Toaster)) {

        patchState(store, {
        cartItems: loadCart(),
        wishlistItems: loadWishlist(),
        customerId: loadCustomerId()
        });

        effect(() => {
          saveCart(store.cartItems());
        });

        effect(() => {
          saveWishlist(store.wishlistItems());
        });

        effect(() => {
          const customerId = store.customerId();
          if (customerId) {
            saveCustomerId(customerId);
          }
        });

        // Load products from backend
        patchState(store, { loading: true });
      
        productApiService.getProducts().subscribe({
          next: (products) => {

            patchState(store, {
              products,
              loading: false
            });
          },
          error: (error) => {
            console.error('Failed to load products:', error);
          
            patchState(store, {
              loading: false
            });
          
            toaster.error('Failed to load products');
          }
        });
      }
    }),
    //withStorageSync({ key: 'ecommerce', select: ({wishlistItems, cartItems, user}) => ({ wishlistItems, cartItems, user }) }),

    withComputed(({categoryName, searchQuery, products, wishlistItems, cartItems, selectedProductId}) => ({
        filtredProducts: computed(()=> {
            let filtered = products()
            if (categoryName() !== 'all'){
              filtered = filtered.filter(p => p.categoryName === categoryName())
            }
            // Filter by search
            const query = searchQuery().trim().toLowerCase();

            if (query){
              filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
            }
            return filtered;
          }),
        wishlistCount: computed(() => wishlistItems().length),
        cartItemsCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
        selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
        
    })),

    withMethods((
      store, 
      toaster = inject(Toaster),  
      router = inject(Router),
      authService = inject(AuthService),
      orderApi = inject(OrderApiService),
      productApi = inject(ProductApiService),
      customerApi = inject(CustomerApiService)
          ) => ({

      setProfileImageUrl: (profileImageUrl: string | undefined) => {
        patchState(store, { profileImageUrl });
      },
      setLoading: (loading: boolean) => {
        patchState(store, { loading });
      },      
      setCustomerId: (customerId: string) => {

        patchState(store, {customerId});
      
        customerApi.getProfileImage(customerId).subscribe({
          next: (imageBlob) => {
            const imageUrl = URL.createObjectURL(imageBlob);
            patchState(store, {profileImageUrl: imageUrl});
          },
        
          error: (error) => {
            if (error.status === 404) {
            
              patchState(store, {profileImageUrl: undefined});
              return;
            }
          
            console.error('Failed to load profile image:',error);
          }
        });
      },
      setCategory: signalMethod<string>((categoryName: string) =>{
        patchState(store, {categoryName})
      }),
      setSearchQuery: signalMethod<string>((query:string) => {
        patchState(store, {searchQuery: query});
      }), 
      setProductId: signalMethod<number>((productId: number) => {
        patchState(store, {selectedProductId : productId})
      }),
      
      addToWishlist: (product: Product) => {
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find(p => p.id === product.id)){
            draft.push(product)
          }
        })
        patchState(store, { wishlistItems: updatedWishlistItems })
        toaster.success("Product added to wishlist")
      },

      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id)
        })
        toaster.success("Product removed from wishlist")
      },

      clearWishlist: () => {
        patchState(store, {wishlistItems: []})
      },

      addToCart: (product: Product, quantity = 1) => {

        const existingIndex = store.cartItems().findIndex(item => item.product.id === product.id);
      
        const currentQuantity =
          existingIndex !== -1 ? store.cartItems()[existingIndex].quantity : 0;
      
        const newQuantity = currentQuantity + quantity;
      
        if (newQuantity > product.availableQuantity) {
          toaster.error('Maximum available quantity reached');
          return;
        }
      
        const updatedCartItems = produce(store.cartItems(), (draft) => {
        
          if (existingIndex !== -1) {
            draft[existingIndex].quantity = newQuantity;
          } else {
            draft.push({product, quantity});
          }
        });
      
        patchState(store, {cartItems: updatedCartItems});
      
        toaster.success(existingIndex !== -1 ? 'Product quantity increased' : 'Product added to the cart');
      },

      setItemQuantity( params:{productId: number, quantity:number}){
        const index = store.cartItems().findIndex(c => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity
        });
        patchState(store, {cartItems :  updated})
      },

      addAllWislistToCart:() => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach(p => {
            if (!draft.find(c => c.product.id === p.id)){
              draft.push({product : p, quantity: 1})
            }
          })
        })
        patchState(store, {cartItems: updatedCartItems, wishlistItems: []})
      },

      removeFromCart: (product : Product) =>{
        const updatedCartItems= store.cartItems().filter(c => c.product.id !== product.id)
        patchState(store, {cartItems : updatedCartItems})
      },

      moveToWishlist: (product : Product) =>{
        const updatedCartItems= store.cartItems().filter(c => c.product.id !== product.id)
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) =>{
          if (!draft.find(p => p.id === product.id)){
            draft.push(product)
          }
        })
        patchState(store, {cartItems : updatedCartItems, wishlistItems: updatedWishlistItems})

      },

      proceedToCheckout: () => {

        if (store.cartItems().length === 0) {
          toaster.error('Your cart is empty');
          return;
        }
      
        if (!authService.isLoggedIn()) { 
          authService.login(`${window.location.origin}/checkout`); 
          return; 
        }
      
        router.navigate(['/checkout']);
      },

      placeOrder: () => {
        patchState( store, { loading: true })

        if(!authService.isLoggedIn()){
          toaster.error("Please login before placing order")
          patchState( store, { loading: false })
          return;
        }

        const customerId = store.customerId();

        if (!customerId) {
            toaster.error("Customer information is not available");
            patchState(store, { loading: false });
            return;
        }

        const order: OrderRequest = {
            customerId,
            products: store.cartItems().map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }))
        };

        orderApi.createOrder(order).subscribe({
            next: (orderId) => {
                patchState(store, { loading: false, cartItems:[] })
                router.navigate(['order-success']);
            },
            error: (error) => {
                console.error('Could not create order:', error);
                toaster.error("Could not place order");            
                patchState(store, {loading: false});
            }
        });
      },

      refreshProducts: () => {
        productApi.getProducts().subscribe({
            next: (products) => {
                patchState(store, { products });
            },
            error: (error) => {
                console.error('Failed to refresh products:', error);
            }
        });
      },

      toggleSideNav(){
        patchState(store, { sidenavOpen: !store.sidenavOpen() })
      }

    }))
)