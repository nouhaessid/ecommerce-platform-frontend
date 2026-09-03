export type OrderRequest = {
  customerId: string;
  products: PurchaseRequest[];
}

export type PurchaseRequest = {
  productId: number;
  quantity: number;
}

