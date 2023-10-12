export interface IProduct {
  id: string;
  brand: string;
  category: string;
  desc: string;
  imageURL: string;
  name: string;
  price: number;
}

export type TCartItems = IProduct & { cartQuantity: number };

export interface IShiipingAddress {
  city: string;
  line: string;
  name: string;
  postalCode: string;
}
export interface IOrder {
  id: string;
  orderAmount: number;
  orderDate: string;
  orderStatus: string;
  orderTime: string;
  userEmail: string;
  userID: string;
  cartItems: TCartItems[];
  shippingAddress: IShiipingAddress;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
