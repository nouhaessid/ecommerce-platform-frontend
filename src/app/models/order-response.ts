export type OrderResponse = {
  id: number;
  reference: string;
  totalAmount: number;
  customerId: string;
  createdDate: string;
};

export type OrderLineResponse = {
  id: number;
  productId: number;
  quantity: number;
};