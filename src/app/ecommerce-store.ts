import { computed, inject } from "@angular/core";
import { Product } from "./models/product";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { produce } from "immer"
import { Toaster } from "./services/toaster";
import { CartItem } from "./models/cart-item";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "./components/sign-in-dialog/sign-in-dialog";
import { SignInParams, SignUpParams, User } from "./models/user";
import { Router } from "@angular/router";
import { Order } from "./models/order";
import { withStorageSync} from "@angular-architects/ngrx-toolkit"
import { AddReviewParams, UserReview } from "./models/user-review";


export type EcommerceState= {
    products: Product[];
    category: string;
    wishlistItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;
    loading: boolean;
    selectedProductId: string | undefined;
    writeReview: boolean
}

export const EcommerceStore = signalStore(
    {
        providedIn: 'root'
    },
    withState({
        products: [
  // --- Electronics ---
  {
    id: 'p1',
    name: 'Wireless Headphones',
    description: 'Bluetooth headphones with active noise cancellation and 30h battery life.',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/28920288/pexels-photo-28920288.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviewCount: 7,
    inStock: true,
    category: 'Electronics',
    reviews: [
      {
        id: 'r1',
        productId: 'p1',
        userName: 'Sarah Johnson',
        userImageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
        rating: 5,
        title: 'Outstanding sound quality',
        comment: 'Amazing sound quality! The active noise cancellation exceeded my expectations and the battery easily lasts two full days.',
        reviewDate: new Date('2026-06-18')
      },
      {
        id: 'r2',
        productId: 'p1',
        userName: 'Michael Brown',
        userImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
        rating: 4,
        title: 'Very comfortable',
        comment: 'Very comfortable even after wearing them for several hours. Great value for the price.',
        reviewDate: new Date('2026-06-02')
      },
      {
        id: 'r3',
        productId: 'p1',
        userName: 'Emma Wilson',
        userImageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
        rating: 5,
        title: 'Perfect for travel',
        comment: 'The noise cancellation makes flights so much more enjoyable. Highly recommended.',
        reviewDate: new Date('2026-05-24')
      },
      {
        id: 'r4',
        productId: 'p1',
        userName: 'Daniel Moore',
        userImageUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
        rating: 4,
        title: 'Solid purchase',
        comment: 'Excellent build quality and rich bass. The carrying case could be a little smaller.',
        reviewDate: new Date('2026-05-15')
      },
      {
        id: 'r5',
        productId: 'p1',
        userName: 'Olivia Davis',
        userImageUrl: 'https://randomuser.me/api/portraits/women/54.jpg',
        rating: 5,
        title: 'Instant pairing',
        comment: 'Connects instantly to my phone every time. The controls are intuitive.',
        reviewDate: new Date('2026-04-29')
      },
      {
        id: 'r6',
        productId: 'p1',
        userName: 'James Miller',
        userImageUrl: 'https://randomuser.me/api/portraits/men/63.jpg',
        rating: 4,
        title: 'Great battery life',
        comment: 'Battery easily lasts over 30 hours. Comfortable cushions too.',
        reviewDate: new Date('2026-04-12')
      },
      {
        id: 'r7',
        productId: 'p1',
        userName: 'Sophia Taylor',
        userImageUrl: 'https://randomuser.me/api/portraits/women/72.jpg',
        rating: 5,
        title: 'Worth every penny',
        comment: 'Probably the best wireless headphones I have owned. Excellent audio and premium feel.',
        reviewDate: new Date('2026-03-27')
      }
    ]
  },
  {
    id: 'p2',
    name: 'Smart Sport Watch',
    description: 'Heart rate tracking, built-in GPS, water resistant up to 50m.',
    price: 149.0,
    imageUrl: 'https://images.pexels.com/photos/27609746/pexels-photo-27609746.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.2,
    reviewCount: 4,
    inStock: true,
    category: 'Electronics',
    reviews: [
      {
        id: 'r8',
        productId: 'p2',
        userName: 'Liam Anderson',
        userImageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        rating: 5,
        title: 'GPS is spot on',
        comment: 'Tracks my runs with impressive accuracy and the heart rate monitor feels reliable.',
        reviewDate: new Date('2026-06-20')
      },
      {
        id: 'r9',
        productId: 'p2',
        userName: 'Ava Martinez',
        userImageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
        rating: 4,
        title: 'Good but battery drains fast with GPS',
        comment: 'Great features overall, though using GPS continuously drops the battery noticeably faster.',
        reviewDate: new Date('2026-06-05')
      },
      {
        id: 'r10',
        productId: 'p2',
        userName: 'Noah Thompson',
        userImageUrl: 'https://randomuser.me/api/portraits/men/37.jpg',
        rating: 4,
        title: 'Survived a swim',
        comment: 'Took it swimming several times and it held up fine with no water damage.',
        reviewDate: new Date('2026-05-19')
      },
      {
        id: 'r11',
        productId: 'p2',
        userName: 'Isabella Clark',
        userImageUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
        rating: 4,
        title: 'Sleek and functional',
        comment: 'Looks great on the wrist and the app syncs data without any issues.',
        reviewDate: new Date('2026-04-30')
      }
    ]
  },
  {
    id: 'p3',
    name: 'Portable Bluetooth Speaker',
    description: '360° sound, IPX7 waterproof, perfect for outdoor use.',
    price: 45.5,
    imageUrl: 'https://images.pexels.com/photos/31683433/pexels-photo-31683433.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 3.9,
    reviewCount: 3,
    inStock: false,
    category: 'Electronics',
    reviews: [
      {
        id: 'r12',
        productId: 'p3',
        userName: 'Ethan Rodriguez',
        userImageUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
        rating: 4,
        title: 'Loud for its size',
        comment: 'Surprisingly powerful sound for such a compact speaker, great for the backyard.',
        reviewDate: new Date('2026-05-28')
      },
      {
        id: 'r13',
        productId: 'p3',
        userName: 'Mia Lewis',
        userImageUrl: 'https://randomuser.me/api/portraits/women/61.jpg',
        rating: 3,
        title: 'Bass could be stronger',
        comment: 'Sound is clear but the bass feels a bit weak compared to other speakers I have tried.',
        reviewDate: new Date('2026-05-10')
      },
      {
        id: 'r14',
        productId: 'p3',
        userName: 'Lucas Walker',
        userImageUrl: 'https://randomuser.me/api/portraits/men/68.jpg',
        rating: 5,
        title: 'Survived a rainstorm',
        comment: 'Got caught outside in the rain with it running and it kept playing without a problem.',
        reviewDate: new Date('2026-04-22')
      }
    ]
  },

  // --- Clothing ---
  {
    id: 'p4',
    name: 'Denim Jacket',
    description: 'Classic fit, 100% cotton, perfect for mid-season weather.',
    price: 59.99,
    imageUrl: 'https://images.pexels.com/photos/2344601/pexels-photo-2344601.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviewCount: 4,
    inStock: true,
    category: 'Clothing',
    reviews: [
      {
        id: 'r15',
        productId: 'p4',
        userName: 'Charlotte Hall',
        userImageUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
        rating: 5,
        title: 'Fits true to size',
        comment: 'Ordered my usual size and it fits perfectly, the denim feels sturdy and well made.',
        reviewDate: new Date('2026-06-14')
      },
      {
        id: 'r16',
        productId: 'p4',
        userName: 'Benjamin Young',
        userImageUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
        rating: 5,
        title: 'Great everyday jacket',
        comment: 'Goes with almost everything in my wardrobe and holds up well after multiple washes.',
        reviewDate: new Date('2026-05-30')
      },
      {
        id: 'r17',
        productId: 'p4',
        userName: 'Amelia King',
        userImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 4,
        title: 'Classic style',
        comment: 'Love the vintage look, only wish it came in a couple more color options.',
        reviewDate: new Date('2026-05-08')
      },
      {
        id: 'r18',
        productId: 'p4',
        userName: 'Henry Wright',
        userImageUrl: 'https://randomuser.me/api/portraits/men/56.jpg',
        rating: 5,
        title: 'Excellent quality for the price',
        comment: 'Feels much more premium than the price suggests, stitching is solid throughout.',
        reviewDate: new Date('2026-04-17')
      }
    ]
  },
  {
    id: 'p5',
    name: 'Organic Cotton T-shirt',
    description: 'Regular fit, soft and breathable, made in France.',
    price: 19.9,
    imageUrl: 'https://images.pexels.com/photos/11671964/pexels-photo-11671964.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.1,
    reviewCount: 3,
    inStock: true,
    category: 'Clothing',
    reviews: [
      {
        id: 'r19',
        productId: 'p5',
        userName: 'Evelyn Scott',
        userImageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
        rating: 4,
        title: 'Soft and breathable',
        comment: 'Really comfortable fabric, great for everyday wear even in warmer weather.',
        reviewDate: new Date('2026-06-08')
      },
      {
        id: 'r20',
        productId: 'p5',
        userName: 'Jack Green',
        userImageUrl: 'https://randomuser.me/api/portraits/men/47.jpg',
        rating: 3,
        title: 'Shrunk slightly after washing',
        comment: 'Shirt shrank a little after the first wash so I would recommend sizing up.',
        reviewDate: new Date('2026-05-21')
      },
      {
        id: 'r21',
        productId: 'p5',
        userName: 'Grace Baker',
        userImageUrl: 'https://randomuser.me/api/portraits/women/58.jpg',
        rating: 5,
        title: 'Great basic tee',
        comment: 'Nice weight of fabric and the fit is flattering without being too tight.',
        reviewDate: new Date('2026-04-25')
      }
    ]
  },

  // --- Home & Garden ---
  {
    id: 'p6',
    name: 'LED Desk Lamp',
    description: 'Adjustable brightness with 5 levels, built-in USB port.',
    price: 34.99,
    imageUrl: 'https://images.pexels.com/photos/923311/pexels-photo-923311.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    reviewCount: 3,
    inStock: true,
    category: 'Home & Garden',
    reviews: [
      {
        id: 'r22',
        productId: 'p6',
        userName: 'Samuel Adams',
        userImageUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
        rating: 5,
        title: 'Perfect for my desk setup',
        comment: 'The brightness levels are great for switching between reading and screen work.',
        reviewDate: new Date('2026-06-11')
      },
      {
        id: 'r23',
        productId: 'p6',
        userName: 'Chloe Nelson',
        userImageUrl: 'https://randomuser.me/api/portraits/women/39.jpg',
        rating: 4,
        title: 'Handy USB port',
        comment: 'Love being able to charge my phone right from the lamp base, very convenient.',
        reviewDate: new Date('2026-05-26')
      },
      {
        id: 'r24',
        productId: 'p6',
        userName: 'David Carter',
        userImageUrl: 'https://randomuser.me/api/portraits/men/49.jpg',
        rating: 4,
        title: 'Sturdy build',
        comment: 'Base feels heavy and stable, does not tip over even when the arm is fully extended.',
        reviewDate: new Date('2026-04-19')
      }
    ]
  },
  {
    id: 'p7',
    name: 'Set of Indoor Plants',
    description: 'Low-maintenance plants, great for purifying the air.',
    price: 27.0,
    imageUrl: 'https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviewCount: 3,
    inStock: true,
    category: 'Home & Garden',
    reviews: [
      {
        id: 'r25',
        productId: 'p7',
        userName: 'Zoe Mitchell',
        userImageUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
        rating: 5,
        title: 'Arrived healthy and vibrant',
        comment: 'Plants arrived in great condition and have been thriving on my windowsill since.',
        reviewDate: new Date('2026-06-16')
      },
      {
        id: 'r26',
        productId: 'p7',
        userName: 'Owen Perez',
        userImageUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
        rating: 5,
        title: 'Easy to care for',
        comment: 'Perfect for someone like me who forgets to water plants regularly.',
        reviewDate: new Date('2026-05-31')
      },
      {
        id: 'r27',
        productId: 'p7',
        userName: 'Lily Roberts',
        userImageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
        rating: 4,
        title: 'Nice variety',
        comment: 'Good mix of plant types and sizes, they brighten up the whole room.',
        reviewDate: new Date('2026-04-27')
      }
    ]
  },
  {
    id: 'p8',
    name: 'Decorative Throw Cushion',
    description: 'Soft-touch cover, removable and machine washable.',
    price: 15.99,
    imageUrl: 'https://images.pexels.com/photos/11073302/pexels-photo-11073302.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 3.8,
    reviewCount: 3,
    inStock: false,
    category: 'Home & Garden',
    reviews: [
      {
        id: 'r28',
        productId: 'p8',
        userName: 'Nora Phillips',
        userImageUrl: 'https://randomuser.me/api/portraits/women/27.jpg',
        rating: 4,
        title: 'Cozy addition to the couch',
        comment: 'Soft cover and the color matches the photos exactly, adds a nice touch to the living room.',
        reviewDate: new Date('2026-05-13')
      },
      {
        id: 'r29',
        productId: 'p8',
        userName: 'Caleb Turner',
        userImageUrl: 'https://randomuser.me/api/portraits/men/39.jpg',
        rating: 3,
        title: 'Cover wrinkles easily',
        comment: 'Nice fabric but the cover wrinkles quite a bit and needs frequent smoothing out.',
        reviewDate: new Date('2026-04-21')
      },
      {
        id: 'r30',
        productId: 'p8',
        userName: 'Hannah Cooper',
        userImageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
        rating: 4,
        title: 'Washes well',
        comment: 'Went through the washing machine several times with no fading or shrinking.',
        reviewDate: new Date('2026-03-30')
      }
    ]
  },

  // --- Sports & Leisure ---
  {
    id: 'p9',
    name: 'Non-Slip Yoga Mat',
    description: '6mm thick, eco-friendly material, includes carrying strap.',
    price: 24.99,
    imageUrl: 'https://images.pexels.com/photos/4793328/pexels-photo-4793328.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    reviewCount: 3,
    inStock: true,
    category: 'Sports & Leisure',
    reviews: [
      {
        id: 'r31',
        productId: 'p9',
        userName: 'Victoria Bell',
        userImageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
        rating: 5,
        title: 'Excellent grip',
        comment: 'No slipping at all even during sweaty hot yoga sessions, cushioning is just right.',
        reviewDate: new Date('2026-06-09')
      },
      {
        id: 'r32',
        productId: 'p9',
        userName: 'Ryan Cook',
        userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4,
        title: 'Thick and comfortable',
        comment: 'The extra thickness is much easier on my knees during floor exercises.',
        reviewDate: new Date('2026-05-17')
      },
      {
        id: 'r33',
        productId: 'p9',
        userName: 'Aria Rivera',
        userImageUrl: 'https://randomuser.me/api/portraits/women/43.jpg',
        rating: 4,
        title: 'Carrying strap is handy',
        comment: 'Makes it easy to bring to the studio, and the mat rolls up tightly with no issue.',
        reviewDate: new Date('2026-04-14')
      }
    ]
  },
  {
    id: 'p10',
    name: 'Urban Folding Bike',
    description: 'Lightweight frame, ideal for city commuting.',
    price: 399.0,
    imageUrl: 'https://images.pexels.com/photos/9354777/pexels-photo-9354777.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    category: 'Sports & Leisure',
    reviews: [
      {
        id: 'r34',
        productId: 'p10',
        userName: 'Nathan Cox',
        userImageUrl: 'https://randomuser.me/api/portraits/men/26.jpg',
        rating: 4,
        title: 'Folds up quickly',
        comment: 'Great for my commute, folds down small enough to fit under my office desk.',
        reviewDate: new Date('2026-06-06')
      },
      {
        id: 'r35',
        productId: 'p10',
        userName: 'Layla Ward',
        userImageUrl: 'https://randomuser.me/api/portraits/women/37.jpg',
        rating: 3,
        title: 'A bit heavy to carry upstairs',
        comment: 'Rides smoothly but carrying it up several flights of stairs is more tiring than expected.',
        reviewDate: new Date('2026-05-12')
      },
      {
        id: 'r36',
        productId: 'p10',
        userName: 'Gabriel Reed',
        userImageUrl: 'https://randomuser.me/api/portraits/men/44.jpg',
        rating: 5,
        title: 'Smooth city commuter',
        comment: 'Handles potholes and city streets well, the lightweight frame makes it easy to maneuver.',
        reviewDate: new Date('2026-04-08')
      }
    ]
  }
      ],
        category: 'all',
        wishlistItems: [],
        cartItems: [],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
        writeReview: false,
    } as EcommerceState),

    withStorageSync({ key: 'ecommerce', select: ({wishlistItems, cartItems, user}) => ({ wishlistItems, cartItems, user }) }),

    withComputed(({category, products, wishlistItems, cartItems, selectedProductId}) => ({
        filtredProducts: computed(()=> {
            if (category().toLocaleLowerCase() === 'all') return  products()
            return products().filter(p => p.category.toLocaleLowerCase() === category().toLowerCase())
          }),
        wishlistCount: computed(() => wishlistItems().length),
        cartItemsCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
        selectedProduct: computed(() => products().find((p) => p.id === selectedProductId()))
    })),

    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) =>{
        patchState(store, {category})
      }),

      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, {selectedProductId : productId})
      }),
      
      addToWishlist: (product: Product) => {
        const updatedWishlistItems = produce( store.wishlistItems(), (draft) => {
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
        const existingIndex = store.cartItems().findIndex(i => i.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if( existingIndex !== -1) {
            draft[existingIndex].quantity += quantity;
            //return
          }
          else
            draft.push({product, quantity})
        })
        patchState(store, {cartItems: updatedCartItems})
        toaster.success(existingIndex !==-1 ? 'Product quantity increased': 'Product added to the cart')
      },

      setItemQuantity( params:{productId: string, quantity:number}){
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
        if (!store.user()){
        matDialog.open(SignInDialog, {
          disableClose: true,
          data: {
            checkout : true
            }
          })
          return;
        }
        router.navigate(['/checkout'])
        
      },

      signIn: ({email, password, checkout, dialogId}: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://img.magnific.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-629.jpg?semt=ais_hybrid&w=740&q=80'
          }})

          matDialog.getDialogById(dialogId)?.close()

          if (checkout){
            router.navigate(['/checkout'])
          }
      },
      signOut: () => {
        patchState(store, {user: undefined})
        //router.navigate()
      },
      
      signUp: ({name, email, password, checkout, dialogId}: SignUpParams) => {
        console.log(checkout)
        patchState(store, {
          user:{
            id: '1',
            email,
            name,
            imageUrl: 'https://img.magnific.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-629.jpg?semt=ais_hybrid&w=740&q=80'
          }})

        matDialog.getDialogById(dialogId)?.close()

          if (checkout){
            router.navigate(['/checkout'])
          }
        },

      placeOrder: async () => {
        patchState( store, { loading: true })

        const user = store.user()

        if(!user){
          toaster.error("Please login before placing order")
          patchState( store, { loading: false })
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: store.cartItems()
                      .reduce((acc, item) => acc + item.quantity * item.product.price, 0),
          items: store.cartItems(),
          paymentStatus: 'success'
        }

        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        patchState(store, { loading: false, cartItems:[] })
        router.navigate(['order-success'])
      },

      showWriteReview: () => {
        patchState(store, { writeReview: true })
      },

      hideWriteReview: () => {
        patchState(store, { writeReview: false })
      },

      addReview: async ({title, comment, rating}: AddReviewParams) => {
        patchState( store, {loading: true});
        const product = store.selectedProduct()
        if (!product){
          patchState(store, {loading: false})
          return;
        }

        const review: UserReview = {
          id: crypto.randomUUID(),
          title,
          comment,
          rating,
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || '',
          reviewDate: new Date(),
        }

        const updatedProducts = produce(store.products(), (draft) => {
          const index = draft.findIndex((p) => p.id === product.id)
          draft[index].reviews.push(review)
          draft[index].rating = Math.round((draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) / draft[index].reviews.length) * 10) / 10
          draft[index].reviewCount = draft[index].reviews.length;
        })
        
        await new Promise((resolve) => setTimeout(resolve, 1000))

        patchState(store, {loading: false, products: updatedProducts, writeReview: false})
        
      }

    }))
)