export interface Account {
  id: string;
  user: User;
  userId: string;
  addresses: Address[];
  cart?: Cart | null;
  wishlist: UserProduct[];
  reviews: Review[];
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UserProduct {
  id: string;
  accountId: string;
  user: Account;
  productId: string;
  product: Product;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pin: string;
  accountId: string;
  account: Account;
}

interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  product: Product;
  productId: string;
}

interface Product {
  id: string;
  description: string;
  category: string;
  imageUrl: string[];
  name: string;
  price: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  CartItem: CartItem[];
  wishlistedBy: UserProduct[];
  productDetails: ProductDetail[];
  reviews: Review[];
}

interface ProductDetail {
  id: string;
  size: string;
  color: string;
  quantity: number;
  productId: string;
  product: Product;
}

interface Cart {
  id: string;
  items: CartItem[];
  accountId?: string | null;
  account?: Account | null;
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  cartId: string;
  cart: Cart;
  color: string;
  size: string;
}

interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  otp?: string | null;
  otpExpires?: Date | null;
  emailVerified?: Date | null;
  account?: Account | null;
  sessions: Session[];
  role: string;
}
